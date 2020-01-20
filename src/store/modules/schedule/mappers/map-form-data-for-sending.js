import { filterNumbersFromStr } from '@/utils';

export default function ({
  isCardPayment,
  valuesToRemove,
  savedFormFields,
  selectedPerformanceSchedules,
}) {
  const removePaymentValues = () => Object
    .entries(savedFormFields)
    .reduce((acc, [key, val]) => (
      !valuesToRemove.includes(key)
        ? { ...acc, [key]: val }
        : { ...acc }
    ), {});

  const findScheduleId = (performanceSchedule, selectedScheduleTime) => {
    const schedule = performanceSchedule.find(({ attributes: { from, to } }) => (
      filterNumbersFromStr(`${from}${to}`) === filterNumbersFromStr(selectedScheduleTime)
    ));

    return schedule.id;
  };

  const preparedFields = isCardPayment ? savedFormFields : removePaymentValues();
  const session = findScheduleId(selectedPerformanceSchedules, preparedFields.schedule);

  return {
    data: {
      type: 'orders',
      attributes: {
        session,
        firstName: preparedFields.firstName,
        lastName: preparedFields.lastName,
        birthday: preparedFields.birthday,
        email: preparedFields.email,
        payment: {
          type: preparedFields.paymentType,
          card: (
            isCardPayment
              ? (
                {
                  number: preparedFields.number,
                  name: preparedFields.name,
                  validThru: preparedFields.validThru,
                }
              )
              : null
          ),
        },
      },
    },
  };
}
