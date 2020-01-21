import get from 'lodash.get';
import isEmpty from 'lodash.isempty';
import flowRight from 'lodash.flowright';
import merge from 'lodash.merge';

const getAllErrors = (errorsObj) => errorsObj.reduce((acc, [errKey, errVal]) => {
  const joinArrErrors = (arrErrors) => arrErrors.join(' ');

  return {
    ...acc,
    [errKey]: Array.isArray(errVal) ? joinArrErrors(errVal) : errVal,
  };
}, {});

const filterPaymentErrors = (errorsEntries) => errorsEntries.filter(([key]) => key !== 'payment');

const toStrCleanedObjErrorEntries = (objErrorsEntries) => objErrorsEntries
  .reduce((acc, [errKey, errVal], idx) => (
    `${acc}${idx > 0 ? '\n' : ''}${idx + 1} - ${errKey}: ${errVal}`
  ), '');

export default function ({ response = {} }) {
  const errors = get(response, ['errorsTree', 'data'], null);

  if (errors && !isEmpty(errors)) {
    const creditCardErrors = flowRight(
      getAllErrors,
      Object.entries,
    )(get(errors, ['payment', 'card'], []));

    const restErrors = flowRight(
      getAllErrors,
      filterPaymentErrors,
      Object.entries,
    )(errors);

    const errorsString = flowRight(
      toStrCleanedObjErrorEntries,
      Object.entries,
    )(merge(creditCardErrors, restErrors));

    return `${errorsString}\n\n Убедитесь, что все поля заполнены правильно !`;
  }

  return (
    `
      Некоторые поля были заполнены неправильно \n
      Проверьте форму и повторите отправку !
      `
  );
}
