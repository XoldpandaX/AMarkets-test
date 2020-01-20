<template>
  <div class="form-wizard-nav-btns">
    <a-button
      type="primary"
      :disabled="isBackwardBtnActive"
      @click="$emit('backward-click')"
    >
      <a-icon type="left" />
      Назад
    </a-button>
    <a-button
      type="primary"
      html-type="submit"
    >
      Вперёд
      <a-icon type="right" />
    </a-button>
  </div>
</template>

<script>
import VueTypes from 'vue-types';

import { Button, Icon } from 'ant-design-vue';

export default {
  name: 'form-wizard-nav-btns',
  components: {
    AButton: Button,
    AIcon: Icon,
  },
  props: {
    isBackwardBtnActive: VueTypes.bool.required,
  },
};
</script>

<style scoped lang="scss">
  @import 'form-wizard-nav-btns';
</style>
