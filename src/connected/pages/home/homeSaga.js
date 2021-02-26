import {
  all,
  call,
  put,
  fork,
  takeLatest
} from 'redux-saga/effects';
import {
  GET_HOME_INTRO,
  SET_HOME_INTRO,
  GET_HOME_CATEGORIES,
  SET_HOME_CATEGORIES
} from './homeReducer';
import {
  requestHomeIntro,
  requestHomeCategories
} from '@utils/apiHelpers';

// WATCHERS
export function* getHomeIntroWatch() {
  yield takeLatest(GET_HOME_INTRO, getHomeIntroWorker);
}

export function* getHomeCategoriesWatch() {
  yield takeLatest(GET_HOME_CATEGORIES, getHomeCategoriesWorker);
}

// WORKERS
export function* getHomeIntroWorker(action) {
  const data = yield call(requestHomeIntro, 'GET', {
    requestAction: action
  });

  const intro = data || [];

  yield put({
    type: SET_HOME_INTRO,
    intro
  });
}

export function* getHomeCategoriesWorker(action) {
  const data = yield call(requestHomeCategories, 'GET', {
    requestAction: action
  });

  const categories = data || [];

  yield put({
    type: SET_HOME_CATEGORIES,
    categories
  });
}

export default function* homeSagas() {
  yield all([
    fork(getHomeIntroWatch),
    fork(getHomeCategoriesWatch)
  ]);
}
