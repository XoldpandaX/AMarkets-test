<template>
  <div>
    <a-form-item
      v-for="field in fields"
      :key="field.id"
      v-bind="field.formItemLayout"
    >
      <a-checkbox v-decorator="field.decorator">
        {{ field.beforeDescription }}
        <a
          :href="field.agreementsLink"
          target="_blank"
        >
          {{ field.linkDescription }}
        </a>
        {{ field.afterDescription }}
      </a-checkbox>
    </a-form-item>
  </div>
</template>

<script>
import VueTypes from 'vue-types';

import { Form, Checkbox } from 'ant-design-vue';

export default {
  name: 'form-tail-fields',
  components: {
    AFormItem: Form.Item,
    ACheckbox: Checkbox,
  },
  props: {
    fields: VueTypes.arrayOf(VueTypes.object).isRequired,
  },
};
</script>
