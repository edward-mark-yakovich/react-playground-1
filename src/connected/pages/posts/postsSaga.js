import {
  all,
  call,
  put,
  fork,
  takeLatest
} from 'redux-saga/effects';
import {
  GET_POSTS,
  SET_POSTS,
} from './postsReducer';
import {
  requestPosts
} from '@utils/apiHelpers';
import {
  isRequestError
} from '@utils/helpers';

// WATCHERS
export function* getPostsWatch() {
  yield takeLatest(GET_POSTS, getPostsWorker);
}

// WORKERS
export function* getPostsWorker(action) {
  const data = yield call(requestPosts, 'GET', {
    requestAction: action
  });

  const posts = data || [];

  if (isRequestError(data)) {
    yield put({
      type: SET_POSTS,
      posts: []
    });

    return;
  }

  yield put({
    type: SET_POSTS,
    posts
  });
}

export default function* postsSagas() {
  yield all([
    fork(getPostsWatch),
  ]);
}
