import {
  all,
  call,
  put,
  fork,
  takeLatest
} from 'redux-saga/effects';
import {
  GET_SINGLE_POST,
  SET_SINGLE_POST,
} from './singlePostReducer';
import {
  requestSinglePost
} from '@utils/apiHelpers';

// WATCHERS
export function* getSinglePostWatch() {
  yield takeLatest(GET_SINGLE_POST, getSinglePostWorker);
}

// WORKERS
export function* getSinglePostWorker(action) {
  const data = yield call(requestSinglePost, 'GET', {
    requestAction: action
  });

  const post = data || [];

  yield put({
    type: SET_SINGLE_POST,
    post
  });
}

export default function* singlePostSagas() {
  yield all([
    fork(getSinglePostWatch),
  ]);
}
