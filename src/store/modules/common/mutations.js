import * as mutationTypes from './mutation-types';

export default {
  [mutationTypes.ADD_NOTIFICATION](state, { type, text, id }) {
    state.notifications.push({
      type,
      text,
      id,
    });
  },

  [mutationTypes.REMOVE_NOTIFICATION](state, { index }) {
    state.notifications.splice(index, 1);
  },
};
