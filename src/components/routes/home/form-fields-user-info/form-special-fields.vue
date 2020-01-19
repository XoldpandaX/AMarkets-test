<template>
  <a-row
    type="flex"
    justify="end"
  >
    <a-col
      v-for="field in fields"
      :key="field.id"
      :span="field.type === 'date-picker' ? 11 : 8"
    >
      <template v-if="field.type === 'date-picker'">
        <a-form-item :wrapper-col="field.formItemLayout">
          <a-date-picker
            v-decorator="field.decorator"
            :format="field.dateFormat"
            :placeholder="field.placeholder"
          />
        </a-form-item>
      </template>
      <template v-else>
        <a-form-item>
          <a-select
            v-decorator="field.decorator"
            :placeholder="field.placeholder"
          >
            <a-select-option
              v-for="option in field.selectOptions"
              :key="option.id"
              :value="option.value"
            >
              {{ option.description }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </template>
    </a-col>
  </a-row>
</template>

<script>
import VueTypes from 'vue-types';

import {
  Form,
  DatePicker,
  Row,
  Col,
  Select,
} from 'ant-design-vue';

export default {
  name: 'form-special-fields',
  components: {
    ACol: Col,
    ADatePicker: DatePicker,
    AFormItem: Form.Item,
    ARow: Row,
    ASelect: Select,
    ASelectOption: Select.Option,
  },
  props: {
    fields: VueTypes.arrayOf(VueTypes.object).isRequired,
  },
};
</script>
