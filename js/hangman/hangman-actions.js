/* eslint-disable max-len */
/* jshint esversion:9*/
import Letter from './letter';
import {getRandomPhrase} from './Phrases';
export const PROCESS_GUESS = 'PROCESS_GUESS';
export const RESET_GAME = 'RESET_GAME';
export const INPLAY = 'INPLAY';
export const WON = 'CONGRATULATIONS YOU WON!!! Click RESET to play again.';
export const LOST = 'SORRY, YOU LOST. Click RESET to play again.';
const URI = location.hostname === 'localhost' || location.hostname === '127.0.0.1'?
'http://localhost/~brian/custom-elements/bcb-elements/bcb-hangman/php/phrases.php':
'php/phrases.php';

export const processGuess = (guess, letters, imageIndex, myguesses) => (dispatch) => {
  guess = guess.substring(0, 1);
  let changed = false;
  let gameState = INPLAY;
  const guesses = [...myguesses, guess.toUpperCase()];
  letters = letters.map((l) => {
    if (l.letter.toUpperCase() == guess.toUpperCase()) {
      l.correct = true;
      changed = true;
    }
    return l;
  });

  if (!changed) imageIndex += 1;
  if (imageIndex>6) {
    imageIndex = 8;
    gameState = LOST;
    letters = letters.map((e) => {
      e.correct=true;
      return e;
    });
  } else if (letters.every((e)=>e.correct===true)) {
    imageIndex = 7;
    gameState = WON;
  }
  const displayPhrase = letters.map((e) => e.singleSpacedLetter()).join('');
  dispatch({
    type: PROCESS_GUESS,
    letters,
    displayPhrase,
    guess,
    imageIndex,
    gameState,
    guesses,
  });
};

export const resetGame = ()=> async (dispatch) => {
  let phrase;
  const response = await fetch(URI).catch(()=>phrase={phrase: getRandomPhrase(), title: 'Local Phrases'});
  if (response.ok) {
    phrase = await response.json();
  } else {
    phrase={phrase: 'something went wrong', title: 'something went wrong'};
  }
  const letters = phrase.phrase.split('').map((e) => new Letter(e));
  const displayPhrase = letters.map((e) => e.singleSpacedLetter()).join('');
  const guess = '';
  const imageIndex = 0;
  const gameState = INPLAY;
  const guesses = [];
  dispatch({
    type: RESET_GAME,
    phrase,
    letters,
    displayPhrase,
    guess,
    imageIndex,
    gameState,
    guesses,
  });
}
;
