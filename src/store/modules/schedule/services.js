import { request } from '@/utils';

export function getPerformances({ isErrorExist } = {}) {
  return request({
    endpoint: 'api/performances',
    requestType: 'get',
    isErrorExist,
  });
}

export function getSessions({ isErrorExist } = {}) {
  return request({
    endpoint: 'api/sessions',
    requestType: 'get',
    isErrorExist,
  });
}
