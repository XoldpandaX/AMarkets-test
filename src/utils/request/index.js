import camelcaseKeys from 'camelcase-keys';
import flowRight from 'lodash.flowright';
import getEndpointData from './fake-REST/get-endpoint-data';
import { CONFIG } from '@/constants';

export default function ({
  endpoint,
  requestType,
  isErrorExist = false,
  isSuccessError,
}) {
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

    return !isErrorExist
      ? resolve(camelCasedData)
      : reject(new Error(errorMsgTransducer(camelCasedData)));
  }, CONFIG.FAKE_REST_RESPONSE_TIME));
}
