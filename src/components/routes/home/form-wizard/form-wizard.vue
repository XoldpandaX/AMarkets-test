<template>
  <div class="form-wizard">
    <div class="form-wizard__info">
      hello
    </div>
    <div class="form-wizard__forms">
      <a-form
        :form="form"
        :hide-required-mark="true"
        @submit="handleSubmit"
      >
        <slot /> <!-- place here form fields(inputs, textarea, date-pickers etc...) -->
        <form-wizard-nav-btns
          :is-backward-btn-active="isBackwardBtnActive"
          :is-forward-btn-active="isForwardBtnActive"
          @backward-click="$emit('backward-click')"
        />
      </a-form>
    </div>
  </div>
</template>

<script>
import VueTypes from 'vue-types';
import moment from 'moment';
import isEmpty from 'lodash.isempty';
import { Form } from 'ant-design-vue';
import userInfoFormFields from '../form-fields-user-info/form-fields';
import performancesFormFields from '../form-fields-performances/form-fields';
import { FORM_WIZARD_STEPS } from '@/constants';
import { getSavedfieldsForStep } from '@/utils';

import { FormWizardNavBtns } from '../form-wizard-nav-btns';

export default {
  name: 'form-wizard-wrapper',
  components: {
    AForm: Form,
    FormWizardNavBtns,
  },
  props: {
    isBackwardBtnActive: VueTypes.bool.required,
    isForwardBtnActive: VueTypes.bool.required,
    currentStepName: VueTypes.string.isRequired,
    initValues: VueTypes.object.def({}),
  },
  created() {
    this.form = this.$form.createForm(this, {
      name: 'wizard',
      onValuesChange: (props, value) => this.$emit('field-value-change', value),
    });
  },
  async mounted() {
    await this.$nextTick();
    this.setFormInitValues();
  },
  data() {
    return {
      form: null,
    };
  },
  watch: {
    async currentStepName() {
      await this.$nextTick();
      this.setFormInitValues();
    },
  },
  computed: {
    // default form properties if saved
    initValuesByStepName() {
      const formValues = {
        [FORM_WIZARD_STEPS.SCHEDULE.NAME]: performancesFormFields.fields,
        [FORM_WIZARD_STEPS.USER_INFO.NAME]: userInfoFormFields,
        [FORM_WIZARD_STEPS.CREDIT_CARD.NAME]: '',
      };

      return getSavedfieldsForStep(formValues[this.currentStepName], this.initValues);
    },
  },
  methods: {
    setFormInitValues() {
      if (!isEmpty(this.initValuesByStepName)) {
        Object
          .entries(this.initValuesByStepName)
          .forEach(([key, val]) => (this.form.setFieldsValue({
            // it's important to format date in to moment format because of the ant design lib
            // see https://www.antdv.com/components/date-picker/ DatePicker - defaultValue prop
            [key]: key === 'birthDate' ? moment(val) : val,
          })));
      }
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$emit('form-submit', values);
        }
      });
    },
  },
};
</script>

<style scoped lang="scss">
  @import 'form-wizard';
</style>
