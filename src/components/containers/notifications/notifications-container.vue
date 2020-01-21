<template>
  <div class="notifications-container notifications-container--right-top">
    <app-notification
      v-for="notification in notifications"
      :key="notification.id"
      :type="notification.type"
      :id="notification.id"
    >
      {{ notification.text }}
    </app-notification>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import { AppNotification } from '@/components/common/app-notification';

export default {
  name: 'notifications-container',
  components: {
    AppNotification,
  },
  computed: {
    ...mapGetters('common', ['notifications']),
  },
};
</script>

<style scoped lang="scss">
  @import 'notifications-container';
</style>
