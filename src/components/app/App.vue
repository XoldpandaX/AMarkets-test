<template>
  <div id="app">
    <router-view v-if="isAppAvailable" />
    <div
      class="app-spinner"
      v-else
    >
      <a-spin size="large" />
    </div>
  </div>
</template>

<script>
import VueTypes from 'vue-types';

import { Spin } from 'ant-design-vue';

export default {
  name: 'app',
  components: {
    ASpin: Spin,
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
