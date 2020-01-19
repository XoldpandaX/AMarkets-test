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

import { Form } from 'ant-design-vue';
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
  },
  created() {
    this.form = this.$form.createForm(this, { name: 'coordinated' });
  },
  data() {
    return {
      formLayout: 'horizontal',
      form: null,
    };
  },
  methods: {
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
