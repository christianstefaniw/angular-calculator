import { Component } from '@angular/core';


@Component({
  selector: 'my-angular-app',
  templateUrl: './calculator.component.html',
})
export class CalculatorComponent {


  input = '';
  result = '';


  pressNum(num: string) {

    if (num == '.') {
      if (this.input != '' ) {

        const lastNum = this.getLastOperand();
        if (lastNum.lastIndexOf('.') >= 0) { return; }
      }
    }

    if (num === '0') {
      if (this.input === '' ) {
        return;
      }
      const PrevKey = this.input[this.input.length - 1];
      if (PrevKey === '/' || PrevKey === '*' || PrevKey === '-' || PrevKey === '+')  {
        return;
      }
    }

    this.input = this.input + num;
    this.calcAnswer();
  }


  getLastOperand() {
    let pos: number;
    pos = this.input.toString().lastIndexOf('+');
    if (this.input.toString().lastIndexOf('-') > pos) { pos = this.input.lastIndexOf('-'); }
    if (this.input.toString().lastIndexOf('*') > pos) { pos = this.input.lastIndexOf('*'); }
    if (this.input.toString().lastIndexOf('/') > pos) { pos = this.input.lastIndexOf('/'); }
    return this.input.substr(pos + 1);
  }


  pressOperator(op: string) {

    const lastKey = this.input[this.input.length - 1];
    if (lastKey === '/' || lastKey === '*' || lastKey === '-' || lastKey === '+')  {
      return;
    }

    this.input = this.input + op;
    this.calcAnswer();
  }


  clear() {
    if (this.input != '' ) {
      this.input = this.input.substr(0, this.input.length - 1);
    }
  }

  allClear() {
    this.result = '';
    this.input = '';
  }

  calcAnswer() {
    let formula = this.input;

    let lastKey = formula[formula.length - 1];

    if (lastKey === '.')  {
      formula = formula.substr(0, formula.length - 1);
    }

    lastKey = formula[formula.length - 1];

    if (lastKey === '/' || lastKey === '*' || lastKey === '-' || lastKey === '+' || lastKey === '.')  {
      formula = formula.substr(0, formula.length - 1);
    }

    this.result = eval(formula);
  }

  getAnswer() {
    this.calcAnswer();
    this.input = this.result;
    if (this.input == '0') { this.input = ''; }
  }

}
