/* eslint-disable no-undef */
/* jshint esversion:9*/
import {createStore, compose, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {lazyReducerEnhancer} from 'pwa-helpers/lazy-reducer-enhancer.js';
import {logger} from './logger';
const devCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// eslint-disable-next-line max-len
export const store = createStore((state) => state, devCompose(lazyReducerEnhancer(combineReducers), applyMiddleware(thunk, logger)));
window.store = store;
