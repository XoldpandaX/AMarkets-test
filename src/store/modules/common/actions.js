import uniqueId from 'lodash.uniqueid';
import { CONFIG } from '@/constants';
import * as mutationTypes from './mutation-types';

function addNotification({ commit, dispatch, state }, {
  type,
  text,
  timeout = CONFIG.NOTIFICATIONS_TIMEOUT,
}) {
  const id = uniqueId();

  if (state.notifications.length > timeout) {
    dispatch('removeNotification', { index: 0 });
  }

  commit(mutationTypes.ADD_NOTIFICATION, { type, text, id });

  if (timeout) {
    setTimeout(() => {
      dispatch('removeNotification', { id });
    }, timeout);
  }
}

function removeNotification({ commit, state }, { id, index }) {
  let notificationIndex = index;

  if (notificationIndex === undefined) {
    notificationIndex = state.notifications.findIndex((notification) => (
      notification.id === id
    ));
  }

  if (notificationIndex >= 0) {
    commit(mutationTypes.REMOVE_NOTIFICATION, { index: notificationIndex });
  }
}

export default {
  addNotification,
  removeNotification,
};
