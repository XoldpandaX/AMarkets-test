<template>
  <div id="app">
    <router-view v-if="isAppAvailable" />
    <div
      class="app-spinner"
      v-else
    >
      <a-spin size="large" />
    </div>
    <notifications-container />
  </div>
</template>

<script>
import VueTypes from 'vue-types';

import { Spin } from 'ant-design-vue';
import { NotificationsContainer } from '../containers/notifications';

export default {
  name: 'app',
  components: {
    ASpin: Spin,
    NotificationsContainer,
  },
  props: {
    isAppAvailable: VueTypes.bool.def(false),
  },
};
</script>

<style lang="scss">
@import '../../assets/styles/index';
@import 'app';
</style>
