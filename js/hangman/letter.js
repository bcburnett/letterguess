/* eslint-disable require-jsdoc */
/* jshint esversion:9*/
export default class Letter {
  constructor(letter) {
    this.letter = letter;
    this.correct = false;
    if (this.letter.match(/[ .\'?!,&-]/)) this.correct = true;
  }
  doubleSpacedLetter() {
    return this.singleSpacedLetter()+' ';
  }
  singleSpacedLetter() {
    return this.correct? this.letter :'⚊';
  }
}
