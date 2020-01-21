export default {
  theaterSchedule: null,
  selectedPerformanceId: '',
  initWizardStepIdx: 0,
  paymentType: '',

  // this fields are needed for save data, and send it to localstorage
  formFields: {},

  isInitDataLoading: false,
  isFormDataSending: false,
  isCardPayment: false,
};
