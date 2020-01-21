import * as mutationTypes from './mutation-types';

export default {
  [mutationTypes.SET_THEATER_SCHEDULE](state, { theaterSchedule }) {
    state.theaterSchedule = theaterSchedule;
  },
  [mutationTypes.SET_INIT_LOADING_STATUS](state, { status }) {
    state.isInitDataLoading = status;
  },
  [mutationTypes.SET_SELECTED_PERFORMANCE_ID](state, { performanceId }) {
    state.selectedPerformanceId = performanceId;
  },
  [mutationTypes.SET_WIZARD_STEP](state, { step }) {
    state.initWizardStepIdx = step;
  },
  [mutationTypes.SET_PAYMENT_TYPE](state, { type }) {
    state.paymentType = type;
  },
  [mutationTypes.SET_DEDICATED_FORM_FIELD](state, { formField }) {
    state.formFields = { ...state.formFields, ...formField };
  },
  [mutationTypes.RESET_STATE](state) {
    console.info(state);
  },
  [mutationTypes.SET_FORM_SENDING_LOADING_STATUS](state, { status }) {
    state.isFormDataSending = status;
  },
};
