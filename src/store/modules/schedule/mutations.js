import * as mutationTypes from './mutation-types';
import { FORM_WIZARD_STEPS } from '@/constants';

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
  [mutationTypes.SET_WIZARD_STEPS_QUANTITY](state, { initFields, isCardPayment }) {
    if (isCardPayment) {
      // use all available steps includes card payment
      state.wizardStepsQuantity = Object
        .values(initFields).length - 1;
    } else {
      // exclude card payment step
      state.wizardStepsQuantity = Object
        .values(initFields)
        .filter(({ NAME }) => NAME !== FORM_WIZARD_STEPS.CREDIT_CARD.NAME)
        .length - 1;
    }
  },
  [mutationTypes.SET_WIZARD_STEP](state, { step }) {
    state.currentWizardStep = step;
  },
  [mutationTypes.SET_PAYMENT_TYPE](state, { type }) {
    state.paymentType = type;
  },
  [mutationTypes.INCREASE_STEP_IDX](state, { totalSteps }) {
    if (state.currentWizardStep < totalSteps) {
      state.currentWizardStep += 1;
    }
  },
  [mutationTypes.DECREASE_STEP_IDX](state) {
    if (state.currentWizardStep > 0) {
      state.currentWizardStep -= 1;
    }
  },
};
