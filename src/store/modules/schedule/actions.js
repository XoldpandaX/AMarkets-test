import get from 'lodash.get';
import * as mutationTypes from './mutation-types';
import { FORM_WIZARD_STEPS, LOCAL_STORAGE } from '@/constants';
import { getPerformances, getSessions, sendFormToServer } from './services';
import { mapSchedule, mapFormDataForSending } from './mappers';
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

    const saveFormData = JSON.parse(localStorage.getItem(LOCAL_STORAGE.WIZARD_FORM_KEY));
    if (saveFormData) {
      const startStepIdx = get(saveFormData, 'currentStepIdx', 0);
      // To know is third step(credit card details) is available
      const startPaymentType = get(saveFormData, 'paymentType', '');
      const startPerformanceId = get(saveFormData, 'performance', '');

      commit(mutationTypes.SET_PAYMENT_TYPE, { type: startPaymentType });
      commit(mutationTypes.SET_SELECTED_PERFORMANCE_ID, { performanceId: startPerformanceId });
      commit(mutationTypes.SET_WIZARD_STEP, { step: startStepIdx });
      commit(mutationTypes.SET_DEDICATED_FORM_FIELD, { formField: { ...saveFormData } });
    }
  } catch (e) {
    console.error(e, 'error while init');
  }
}

async function sendFormData({ getters }, { isCardPayment, isSuccessError }) {
  try {
    const data = mapFormDataForSending({
      isCardPayment,
      // in case of not is credit-card payment(cash)
      valuesToRemove: Object.values(FORM_WIZARD_STEPS.CREDIT_CARD.FIELDS),
      savedFormFields: getters.savedFormFields,
      selectedPerformanceSchedules: getters.performanceSchedule,
    });

    const { success } = await sendFormToServer({ isSuccessError, postData: data });
    console.info(success);
    // await dispatch('resetSavedData');
  } catch (e) {
    console.error(e, 'error while sendFormData');
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

function changeFormLoadingStatus({ commit }, { status }) {
  commit(mutationTypes.SET_FORM_SENDING_LOADING_STATUS, { status });
}

function setSelectedPerformanceId({ commit }, { performanceId }) {
  commit(mutationTypes.SET_SELECTED_PERFORMANCE_ID, { performanceId });
}

// save form fields and current wizard step
function saveFormInfo({ commit, getters }, { formField = {}, currentStepIdx }) {
  commit(mutationTypes.SET_DEDICATED_FORM_FIELD, {
    formField: { ...formField, currentStepIdx },
  });

  localStorage.setItem(LOCAL_STORAGE.WIZARD_FORM_KEY, JSON.stringify(getters.savedFormFields));
}

function resetSavedData({ commit }) {
  console.info(commit);
  localStorage.removeItem(LOCAL_STORAGE.WIZARD_FORM_KEY);
}

export default {
  fetchTheaterSchedule,
  init: withLoader({
    func: init,
    loadingAffectAction: 'schedule/handleInitLoading',
  }),
  sendFormData: withLoader({
    func: sendFormData,
    loadingAffectAction: 'schedule/changeFormLoadingStatus',
  }),
  handleInitLoading,
  setSelectedPerformanceId,
  setPaymentType,
  changePaymentType,
  saveFormInfo,
  resetSavedData,
  changeFormLoadingStatus,
};
