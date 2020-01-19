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
    // TODO: have to add logic to define init step, if data previously was saved
    commit(mutationTypes.SET_WIZARD_STEP, { step: 0 });
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
};
