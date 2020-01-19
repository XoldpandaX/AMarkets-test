import * as responseData from './data';

export default function ({ endpoint, requestType, isErrorExist = false }) {
  const getDataByEndpoint = {
    'api/performances': responseData.performances,
    'api/sessions': responseData.sessions,
  };

  const postDataEndpoints = {
    'api/orders': responseData.postSuccess,
  };

  if (isErrorExist) {
    return responseData.error;
  }

  if (requestType === 'get') {
    return getDataByEndpoint[endpoint];
  }

  if (requestType === 'post') {
    return postDataEndpoints[endpoint];
  }

  return null;
}
