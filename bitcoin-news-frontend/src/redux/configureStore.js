import { createStore, applyMiddleware, combineReducers } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';

/* Load modules */
import base from './modules/base';
import form from './modules/form';
import register from './modules/register';
import main from './modules/main';

/* Configure middleware */
const middlewares = [promiseMiddleware()];

const createStoreWithMiddleware = applyMiddleware( ...middlewares)(createStore);

/* Combine the reducers */
const reducer = combineReducers({
    base,
    form,
    register,
    main
});

const configureStore = (initialState) => createStoreWithMiddleware(reducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default configureStore;
