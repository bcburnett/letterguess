/* jshint esversion:9*/
/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import {PROCESS_GUESS, INPLAY, RESET_GAME} from './hangman-actions.js';

// get the hangman images array
const images =[];
let e = 0;
[...Array(7)].forEach(() => {
  const img = document.createElement('img');
  const src='img/s'+e+'.png';
  e++;
  img.src=src;
  images.push(img);
});
let img = document.createElement('img');
img.src='img/giphy.gif';
img.width='300';
images.push(img);
img = document.createElement('img')
img.src='img/loose.gif';
img.width='300';
images.push(img);

const btnArray = [
  'A', 'B', 'C', 'D', 'E',
  'F', 'G', 'H', 'I', 'J',
  'K', 'L', 'M', 'N', 'O',
  'P', 'Q', 'R', 'S', 'T',
  'U', 'V', 'W', 'X', 'Y',
  'Z', 'RESET'];

const INITIAL_STATE = {
  images,
  imageIndex: 0,
  phrase: {phrase: '', title: ''},
  letters: [],
  displayPhrase: '',
  gameState: INPLAY,
  guesses: [],
  btnArray,
};


const hangman = (state= INITIAL_STATE, action) => {
  switch (action.type) {

    case PROCESS_GUESS:
      return {
        ...state,
        letters: action.letters,
        displayPhrase: action.displayPhrase,
        guess: action.guess,
        imageIndex: action.imageIndex,
        gameState: action.gameState,
        guesses: action.guesses,
      };

    case RESET_GAME:
      return {
        ...state,
        letters: action.letters,
        displayPhrase: action.displayPhrase,
        guess: action.guess,
        imageIndex: action.imageIndex,
        gameState: action.gameState,
        guesses: action.guesses,
        phrase: action.phrase,
      };

    default:
      return state;
  }
};

export default hangman;
