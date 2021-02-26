import {combineReducers} from 'redux';

import {connectRouter} from 'connected-react-router';
import {routerReducer} from './../routerReducer';

import {homeReducer} from '@connected/pages/home/homeReducer';
import {postsReducer} from '@connected/pages/posts/postsReducer';
import {singlePostReducer} from '@connected/pages/single-post/singlePostReducer';

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  routerReducer,
  homeReducer,
  postsReducer,
  singlePostReducer
});

export default createRootReducer;
