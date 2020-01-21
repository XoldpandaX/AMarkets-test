<template>
  <div :class="rootClasses">
    <button
      class="notification__close"
      @click="handleClick"
    />
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
  methods: {
    handleClick() {
      this.$emit('close-click', { id: this.id });
    },
  },
};
</script>

<style scoped lang="scss">
  @import 'notification';
</style>
