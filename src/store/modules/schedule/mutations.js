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
    state.currentWizardStep = step;
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
