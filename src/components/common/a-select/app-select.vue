<template>
  <a-select
    :style="selectWidth"
    :defaultValue="defaultVal"
    @change="handleChange"
  >
    <a-select-option
      v-for="option in options"
      :key="option"
      :value="option"
    >
      {{ option }}
    </a-select-option>
  </a-select>
</template>

<script>
import VueTypes from 'vue-types';

import { Select } from 'ant-design-vue';

export default {
  name: 'app-select',
  components: {
    ASelect: Select,
    ASelectOption: Select.Option,
  },
  props: {
    defaultVal: VueTypes.string.required,
    width: VueTypes.number.def(200),
    options: VueTypes.arrayOf(VueTypes.string).required,
  },
  computed: {
    selectWidth() {
      return {
        width: `${this.width}px`,
      };
    },
  },
  methods: {
    handleChange(val) {
      this.$emit('select', val);
    },
  },
};
</script>
