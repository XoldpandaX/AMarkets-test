import camelcaseKeys from 'camelcase-keys';
import flowRight from 'lodash.flowright';
import getEndpointData from './fake-REST/get-endpoint-data';

export default function ({
  endpoint,
  requestType,
  isErrorExist = false,
  isSuccessError,
}) {
  const timeToResponse = 1500;
  const endpointData = getEndpointData({
    endpoint,
    requestType,
    isErrorExist,
    isSuccessError,
  });

  const errorMsgTransducer = (errorData) => {
    const { code, errorsTree: { data } } = errorData;
    return `${code}: ${data}`;
  };

  return new Promise((resolve, reject) => setTimeout(() => {
    const camelCasedData = flowRight(
      camelcaseKeys,
      JSON.parse,
    )(endpointData);
    console.info(camelCasedData);

    return !isErrorExist
      ? resolve(camelCasedData)
      : reject(new Error(errorMsgTransducer(camelCasedData)));
  }, timeToResponse));
}
