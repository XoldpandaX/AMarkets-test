<template>
  <div>
    <a-form-item
      v-for="field in fieldsOfForm.fields"
      v-bind="fieldsOfForm.commonLayoutStyles"
      has-feedback
      :key="field.id"
      :label="field.label"
    >
      <!-- options with performances -->
      <a-select
        v-if="field.type === 'performance'"
        v-decorator="field.decorator"
        :placeholder="field.placeholder"
        @change="handlePerformanceChange"
      >
        <a-select-option
          v-for="performance in performances"
          :key="performance.id"
          :value="performance.id"
        >
          {{ performance.title }}
        </a-select-option>
      </a-select>

      <!-- options with performance schedule -->
      <a-select
        v-else
        v-decorator="field.decorator"
        :placeholder="field.placeholder"
        :disabled="!isScheduleExist"
      >
        <template v-if="isScheduleExist">
          <a-select-option
            v-for="schedule in selectedPerformanceSchedule"
            :key="schedule.id"
            :value="formatScheduleBorders(
              schedule.attributes.from,
              schedule.attributes.to,
            )"
          >
            {{ formatScheduleBorders(schedule.attributes.from, schedule.attributes.to) }}
          </a-select-option>
        </template>
      </a-select>
    </a-form-item>
  </div>
</template>

<script>
import VueTypes from 'vue-types';
import { Select, Form } from 'ant-design-vue';
import formFields from './form-fields';

export default {
  name: 'form-fields-performances',
  components: {
    AFormItem: Form.Item,
    ASelect: Select,
    ASelectOption: Select.Option,
  },
  props: {
    performances: VueTypes.arrayOf(VueTypes.object).def([]),
    selectedPerformanceSchedule: VueTypes.arrayOf(VueTypes.object).def([]),
  },
  computed: {
    isScheduleExist() {
      return this.selectedPerformanceSchedule.length;
    },
    fieldsOfForm() {
      return formFields;
    },
  },
  methods: {
    handlePerformanceChange(val) {
      this.$emit('performance-select', val);
    },
    formatScheduleBorders(from, to) {
      return `с ${from} до ${to}`;
    },
  },
};
</script>
