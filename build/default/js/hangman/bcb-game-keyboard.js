import { LitElement, html, css } from "../../node_modules/lit-element/lit-element.js";
import { connect } from "../../node_modules/pwa-helpers/connect-mixin.js";
import { store } from '../redux/store.js';
/**
 *
 *
 * @export
 * @class BcbGameKeyboard
 * @augments {connect(store)(LitElement)}
 */

export class BcbGameKeyboard extends connect(store)(LitElement) {
  /**
   *
   * lit-element observed properties
   * @readonly
   * @static
   * @memberof BcbGameKeyboard
   */
  static get properties() {
    return {
      btnArray: Array
    };
  }
  /**
   *
   * lit-element styles array. external style sheets can be added here.
   * @readonly
   * @static
   * @memberof BcbGameKeyboard
   */


  static get styles() {
    return [css`
button{
  padding-top:4px;
  background-color:rgba(255, 255, 255,.75);
  color:var(--calc-color);
  border-color:var(--calc-color);
  border-width:1px;
  font-weight: bold;
  font-size:1rem;
}

button:hover{
  color:orange;
  background-color:lightblue;
  scale:1.2;
}

.keyboard{
  width:33%;
  padding-top:8px;
  display:grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-auto-rows: 50px;
  grid-gap:3px;
  margin: auto;
}

.orange{
  color:orange;
}

@media (max-width: 800px) {
  .keyboard{
    width: 90%;
  }
  button{
    font-size: 1rem;
  }
}
`];
  }
  /**
   * renders this custom elements html and css
   *
   * @return {object} renders this custom elements html and css
   * @memberof BcbGameKeyboard
   */


  render() {
    const makeButtons = () => {
      return this.btnArray.map(e => html`
          <button
          @click="${() => this.dispatchEvent(new CustomEvent('bcbcgamekeyboard', {
        detail: e
      }))}"
          id="${e}"
          >
          ${e}
        </button>
        `);
    };

    return html`
    <div class="keyboard">
      ${makeButtons()}
    </div>
    `;
  }
  /**
   * run on state change
   *
   * @param {object} state read only.
   * @memberof BcbGameKeyboard
   */


  stateChanged(state) {
    const app = state.hangman;
    this.btnArray = app.btnArray;

    if (app.guesses.length === 0 && this.shadowRoot.getElementById('A')) {
      this.btnArray.forEach(e => {
        this.shadowRoot.getElementById(e).classList.remove('orange');
      });
    }

    app.guesses.forEach(e => {
      this.shadowRoot.getElementById(e).classList.add('orange');
    });
  }

}
customElements.define('bcb-game-keyboard', BcbGameKeyboard);