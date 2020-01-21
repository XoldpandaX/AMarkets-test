import * as mutationTypes from './mutation-types';

export default {
  [mutationTypes.SET_THEATER_SCHEDULE](state, { theaterSchedule }) {
    state.d = theaterSchedule;
  },
};
