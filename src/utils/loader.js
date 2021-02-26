import axios from 'axios';
import { call } from 'redux-saga/effects';
import _ from 'lodash';
import queryString from 'query-string';

export const defaults = {
  url: '',
  method: 'GET',
  data: undefined,
  useSpinner: true,
  useInlineSpinner: false,
  preLoad: _.noop,
  postLoad: _.noop,
  messageType: '',
  messageSuccess: 'Success!',
  messageError: (error) => {
    return 'An error? = ' + error
  },
  errorMessage: '',
  messageOverride: false,
  retryUnauthorized: true
};

export const requestConfigKeys = [
  'url',
  'method',
  'data',
  'timeout',
  'headers',
  'withCredentials',
  'params'
];

// This allows us to serialize our query parameters -- specifically solving for handling array/repeated queries
axios.defaults.paramsSerializer = params => queryString.stringify(params, {encode: true});

class Loader {

  *request (opts) {
    const config = _.assign({}, defaults, opts);
    const requestConfig = _.assign({}, _.pick(config, requestConfigKeys));

    function* preLoad() {
      document.querySelector('body').classList.add('_request-active');
      yield call(config.preLoad);
    }

    function* postLoad(error = {}) {
      document.querySelector('body').classList.remove('_request-active');
      yield call(config.postLoad, error);
    }

    let response;

    yield call(preLoad);

    try {
      response = yield call(axios, requestConfig);
    } catch(error) {
      yield call(postLoad, error);

      // do something with error

      return error;
    }

    const {data} = response;

    yield call(postLoad);

    return data;
  }
}

// Ensure only a singleton is exported
const instance = new Loader();

export default instance;
