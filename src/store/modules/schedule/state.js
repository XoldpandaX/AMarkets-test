export default {
  theaterSchedule: null,
  selectedPerformanceId: '',
  initWizardStepIdx: 0,
  paymentType: '',

  isInitDataLoading: false,
  isFormDataSending: false,
  isCardPayment: false,

  // this fields are needed for save data, and send it to localstorage
  formFields: {},
};
