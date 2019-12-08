/* eslint-disable no-undef */

/* jshint esversion:9*/
import { createStore, compose, applyMiddleware, combineReducers } from "../../node_modules/redux/es/redux.js";
import thunk from "../../node_modules/redux-thunk/es/index.js";
import { lazyReducerEnhancer } from "../../node_modules/pwa-helpers/lazy-reducer-enhancer.js";
import { logger } from "./logger.js";
const devCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-next-line max-len

export const store = createStore(state => state, devCompose(lazyReducerEnhancer(combineReducers), applyMiddleware(thunk, logger)));
window.store = store;