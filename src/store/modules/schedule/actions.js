import get from 'lodash.get';
import * as mutationTypes from './mutation-types';
import { getPerformances, getSessions } from './services';
import { mapSchedule } from './mappers';
import { withLoader } from '@/utils';

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

async function init({ commit, dispatch }, { isErrorExist = false } = {}) {
  try {
    await dispatch('fetchTheaterSchedule', { isErrorExist });

    const saveFormData = JSON.parse(localStorage.getItem('wizardForm'));
    if (saveFormData) {
      const startStepIdx = get(saveFormData, 'currentStepIdx', 0);
      // To know is third step(credit card details) is available
      const startPaymentType = get(saveFormData, 'paymentType', '');

      commit(mutationTypes.SET_PAYMENT_TYPE, { type: startPaymentType });
      commit(mutationTypes.SET_WIZARD_STEP, { step: startStepIdx });
      commit(mutationTypes.SET_DEDICATED_FORM_FIELD, { formField: { ...saveFormData } });
    }
  } catch (e) {
    console.error(e, 'error while init');
  }
}

async function changePaymentType({ dispatch }, { type }) {
  await dispatch('setPaymentType', { type });
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

// save form fields and current wizard step
function saveFormInfo({ commit, getters }, { formField = {}, currentStepIdx }) {
  commit(mutationTypes.SET_DEDICATED_FORM_FIELD, {
    formField: { ...formField, currentStepIdx },
  });

  localStorage.setItem('wizardForm', JSON.stringify(getters.savedFormFields));
}

export default {
  fetchTheaterSchedule,
  init: withLoader({
    func: init,
    loadingAffectAction: 'schedule/handleInitLoading',
  }),
  handleInitLoading,
  setSelectedPerformanceId,
  setPaymentType,
  changePaymentType,
  saveFormInfo,
};
