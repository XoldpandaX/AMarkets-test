<template>
  <div>
    <a-form-item
      v-for="field in fields"
      v-bind="field.formItemLayout"
      :key="field.id"
      :label="field.label"
    >
      <a-input
        v-decorator="field.decorator"
        :placeholder="field.placeholder"
      />
    </a-form-item>
  </div>
</template>

<script>
import VueTypes from 'vue-types';

import { Form, Input } from 'ant-design-vue';

export default {
  name: 'form-input-fields',
  components: {
    AFormItem: Form.Item,
    AInput: Input,
  },
  props: {
    fields: VueTypes.arrayOf(VueTypes.shape({
      id: VueTypes.string,
      label: VueTypes.string,
      placeholder: VueTypes.string,
      formItemLayout: VueTypes.object,
      decorator: VueTypes.array,
    })).isRequired,
  },
};
</script>
