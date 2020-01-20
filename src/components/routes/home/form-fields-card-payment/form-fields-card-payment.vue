<template>
  <div class="form-fields-card-payment">
    <a-form-item
      v-for="field in fieldsOfForm.inputFields"
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
import { Form, Input } from 'ant-design-vue';
import formFields from './form-fields';

export default {
  name: 'form-fields-card-payment',
  components: {
    AFormItem: Form.Item,
    AInput: Input,
  },
  computed: {
    fieldsOfForm() {
      return formFields;
    },
  },
};
</script>

<style scoped lang="scss">
  @import 'form-fields-card-payment';
</style>
