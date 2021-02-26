import _ from 'lodash';
import { createBrowserHistory } from 'history';
import {createStore, applyMiddleware, compose} from 'redux';
import createRootReducer from './reducers';
import * as sagas from './sagas';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';

const sagaMiddleware = createSagaMiddleware();

export const history = createBrowserHistory();

const middleware = [
  sagaMiddleware,
  routerMiddleware(history)
];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const createStoreWithMiddleware = composeEnhancers(
  applyMiddleware(...middleware)
)(createStore);

const store = createStoreWithMiddleware(createRootReducer(history));

// run saga watchers
_.forEach(_.values(sagas), sagaMiddleware.run);

export default store;
