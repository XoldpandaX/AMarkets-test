<template>
  <div :class="rootClasses">
    <slot /> <!-- place text here -->
  </div>
</template>

<script>
import VueTypes from 'vue-types';

export default {
  name: 'app-notification',
  props: {
    type: VueTypes.oneOf([
      'primary',
      'info',
      'success',
      'warning',
      'danger',
    ]).def('primary'),
    id: VueTypes.string.isRequired,
  },
  computed: {
    rootClasses() {
      const base = 'notification';

      return [base, `${base}--${this.type}`];
    },
  },
};
</script>

<style scoped lang="scss">
  @import 'notification';
</style>
