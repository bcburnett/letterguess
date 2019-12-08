/* eslint-disable max-len */

/* eslint-disable require-jsdoc */
import { LitElement, html, css } from "../../node_modules/lit-element/lit-element.js";
import { connect } from "../../node_modules/pwa-helpers/connect-mixin.js";
import { store } from '../redux/store.js';
import { processGuess, INPLAY, resetGame } from './hangman-actions.js';
import hangman from './hangman-reducers.js';
import './bcb-game-keyboard.js';
store.addReducers({
  hangman
});
export class BcbHangman extends connect(store)(LitElement) {
  /**
   * lit-element observed properties
   */
  static get properties() {
    return {
      images: Array,
      imageIndex: Number,
      phrase: Object,
      displayPhrase: String,
      guesses: Array
    };
  }

  static get styles() {
    return [css`
  my-purple{
    color:purple;
  }
  my-blue{
    color:blue;
  }
  my-orange{
    color:orange;
  }
  pre {
  white-space: pre-wrap;
  word-break: keep-all
}
`];
  }

  constructor() {
    super();
    this.imageIndex = 0;
    this.phrase = {};
    this.letters = [];
    this.displayPhrase = '';
    store.dispatch(resetGame());
  }

  render() {
    return html`
  ${this.images[this.imageIndex]}
  <h1>
    <my-orange>the category is ${this.phrase.title}</my-orange>
  </h1>

  <h1>
    <my-orange>
      <pre>${this.displayPhrase}</pre>
    </my-orange>
  </h1>

  <h1>
    <my-orange>${this.gameState === INPLAY ? 'Please click on a letter to guess.' : this.gameState}</my-orange>
  </h1>

  <bcb-game-keyboard 
    @bcbcgamekeyboard="${e => this.guessEntered(e.detail)}">
  </bcb-game-keyboard>

    `;
  }

  guessEntered(guess) {
    if (guess === 'RESET') {
      store.dispatch(resetGame());
      return;
    }

    if (this.guesses.includes(guess) || this.gameState != INPLAY) return;
    store.dispatch(processGuess(guess, this.letters, this.imageIndex, this.guesses));
  }
  /**
   * @param {Object} state
   */


  stateChanged(state) {
    const app = state.hangman;
    if (this.images !== app.images) this.images = app.images;
    if (this.imageIndex !== app.imageIndex) this.imageIndex = app.imageIndex;
    if (this.phrase !== app.phrase) this.phrase = app.phrase;
    if (this.letters !== app.letters) this.letters = app.letters;
    if (this.gameState !== app.gameState) this.gameState = app.gameState;
    if (this.guesses !== app.guesses) this.guesses = app.guesses;
    if (this.displayPhrase !== app.displayPhrase) this.displayPhrase = app.displayPhrase;
  }

}
customElements.define('bcb-hangman', BcbHangman);