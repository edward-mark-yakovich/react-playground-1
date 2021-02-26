import _ from 'lodash';
import store from '@redux/store';
import {
  push,
  goBack as goBackAction
} from 'connected-react-router';

export const CEASE_EXECUTION = "system/cease_execution";

export function goTo(route, event) {
  if (!_.isEmpty(event)) {
    event.preventDefault();
  }

  store.dispatch(push(route));
}

export function goBack(event) {
  if (!_.isEmpty(event)) {
    event.preventDefault();
  }

  store.dispatch(goBackAction());
}

export function logErrorRemotely(error, errorInfo = {}) {
  try {
    // an error occured
    console.log('App error - do stuff with error...');
    console.log(error);
    console.log(errorInfo);
  } catch (e) {
    // eslint-disable-next-line
    console.log(e);
  }
}
