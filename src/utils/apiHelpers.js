import _ from 'lodash';
import loader from './loader';

export const apiHost = `${window.config.apiHost}`;
export const getApiHost = action => `${apiHost}${action}`;

export function request(action, data = {}) {
  const suffix = !_.isNil(data.id) ? `/${data.id}` : '';
  const url = `${action}${suffix}`;

  const config = {
    ..._.omit(data, 'connected'),
    withCredentials: false,
    url
  };

  return loader['request'](config);
}

export function composedRequest(actionName, method = 'GET', options = {}) {
  const action = getApiHost(actionName);
  const data = {
    method,
    ...options
  };

  return request(action, data);
}

export function requestHomeIntro(method, options) {
  return composedRequest(`pages?_embed&slug=about`, method, options);
}

export function requestHomeCategories(method, options) {
  return composedRequest(`categories`, method, options);
}

export function requestPosts(method, options) {
  const page = options?.requestAction?.params?.page || '1';
  const perPage = options?.requestAction?.params?.perPage || '20';

  return composedRequest(`posts?_embed&per_page=${perPage}&page=${page}`, method, options);
}

export function requestSinglePost(method, options) {
  const slug = options?.requestAction?.params || '';

  return composedRequest(`posts?_embed&slug=${slug}`, method, options);
}
