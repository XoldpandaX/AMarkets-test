import * as mutationTypes from './mutation-types';
import { getPerformances, getSessions } from './services';
import { mapSchedule } from './mappers';
import { withLoader } from '@/utils';
import { WIZARD_STEPS_DIRECTIONS, FORM_WIZARD_STEPS } from '@/constants';

async function fetchTheaterSchedule({ commit }, { isErrorExist = false } = {}) {
  try {
    const [
      { data: performances },
      { data: sessions },
    ] = await Promise.all([
      getPerformances({ isErrorExist }),
      getSessions({ isErrorExist }),
    ]);

    commit(mutationTypes.SET_THEATER_SCHEDULE, {
      theaterSchedule: mapSchedule({ performances, sessions }),
    });
  } catch (e) {
    console.error(e, 'error while fetchTheaterSchedule');
  }
}

async function init({ dispatch }, { isErrorExist = false } = {}) {
  try {
    await dispatch('fetchTheaterSchedule', { isErrorExist });
    // TODO: have to add logic to define quantity of steps, depends on payment method(if by card)
    await dispatch('setWizardStepsQuantity');

    // TODO: have to add logic to define init step, if data previously was saved
    await dispatch('setWizardStep', { step: 0 });
  } catch (e) {
    console.error(e, 'error while init');
  }
}

function makeStep({ commit, getters }, { stepDirection }) {
  if (stepDirection === WIZARD_STEPS_DIRECTIONS.FORWARD) {
    commit(mutationTypes.INCREASE_STEP_IDX, {
      totalSteps: getters.wizardStepsQuantity,
    });
  }

  if (stepDirection === WIZARD_STEPS_DIRECTIONS.BACKWARD) {
    commit(mutationTypes.DECREASE_STEP_IDX);
  }
}

async function changePaymentType({ dispatch }, { type }) {
  await dispatch('setPaymentType', { type });
  await dispatch('setWizardStepsQuantity');
}

function setWizardStepsQuantity({ commit, getters: { isCardPayment } }) {
  commit(mutationTypes.SET_WIZARD_STEPS_QUANTITY, {
    initFields: FORM_WIZARD_STEPS,
    isCardPayment,
  });
}

function setPaymentType({ commit }, { type }) {
  commit(mutationTypes.SET_PAYMENT_TYPE, { type });
}

function handleInitLoading({ commit }, { status }) {
  commit(mutationTypes.SET_INIT_LOADING_STATUS, { status });
}

function setSelectedPerformanceId({ commit }, { performanceId }) {
  commit(mutationTypes.SET_SELECTED_PERFORMANCE_ID, { performanceId });
}

function setWizardStep({ commit }, { step }) {
  commit(mutationTypes.SET_WIZARD_STEP, { step });
}

export default {
  fetchTheaterSchedule,
  setWizardStep,
  init: withLoader({
    func: init,
    loadingAffectAction: 'schedule/handleInitLoading',
  }),
  handleInitLoading,
  setSelectedPerformanceId,
  makeStep,
  setWizardStepsQuantity,
  setPaymentType,
  changePaymentType,
};
