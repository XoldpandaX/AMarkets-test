import * as responseData from './data';

export default function ({
  endpoint,
  requestType,
  isErrorExist = false,
  isSuccessError = false,
}) {
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

  if (isSuccessError) {
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
