import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers';

const loggerMiddleware = createLogger();

export const Store = createStore(
    rootReducer,
    applyMiddleware(
        thunk,
        loggerMiddleware
    )
);