<template>
  <form-wizard
    @form-submit="handleSubmit"
    @field-value-change="throttledHandleValueChange"
    @backward-click="handleBackwardClick"
    :init-values="savedFormFields"
    :is-backward-btn-active="isBackwardBtnAvailable"
    :is-forward-btn-active="isForwardBtnAvailable"
    :current-step-name="currentStepName"
  >
    <form-fields-performances
      v-if="isFirstStep"
      :performances="theaterSchedule"
      :selected-performance-schedule="performanceSchedule"
      @select="handleSelect"
    />
    <form-fields-user-info
      v-if="isSecondStep"
      @payment-change="handlePaymentChange"
    />
    <form-fields-card-payment v-if="isThirdStep" />
  </form-wizard>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import throttle from 'lodash.throttle';
import { FORM_WIZARD_STEPS, PAYMENT_TYPES } from '@/constants';

import { FormFieldsUserInfo } from '../form-fields-user-info';
import { FormWizard } from '../form-wizard';
import { FormFieldsCardPayment } from '../form-fields-card-payment';
import { FormFieldsPerformances } from '../form-fields-performances';

export default {
  name: 'container-form-wizard',
  components: {
    FormFieldsUserInfo,
    FormWizard,
    FormFieldsPerformances,
    FormFieldsCardPayment,
  },
  created() {
    // check for saved payment card prop from store
    this.throttledHandleValueChange = throttle(this.handleValueChange, 700);
    this.initWizardStartIdx();
    this.initWizardSteps();
  },
  data() {
    return {
      wizardSteps: null,
      currentStepIdx: 0,
      isPaymentStepActive: false,
    };
  },
  computed: {
    ...mapGetters('schedule', [
      'theaterSchedule',
      'performanceSchedule',
      'savedFormFields',
      'startWizardIdx',
    ]),

    currentStepName() {
      return this.wizardSteps[this.currentStepIdx].NAME;
    },
    isFirstStep() {
      return this.currentStepName === FORM_WIZARD_STEPS.SCHEDULE.NAME;
    },
    isSecondStep() {
      return this.currentStepName === FORM_WIZARD_STEPS.USER_INFO.NAME;
    },
    isThirdStep() {
      return this.currentStepName === FORM_WIZARD_STEPS.CREDIT_CARD.NAME;
    },
    totalSteps() {
      // for easy comparing with arr index which starts from 0
      return this.wizardSteps.length - 1;
    },

    // form nav btns availability
    isForwardBtnAvailable() {
      return this.currentStepIdx === this.totalSteps;
    },
    isBackwardBtnAvailable() {
      return !this.currentStepIdx > 0;
    },
  },
  methods: {
    ...mapActions('schedule', ['setSelectedPerformanceId', 'saveFormInfo']),

    // INIT methods
    initWizardStartIdx() {
      this.currentStepIdx = this.startWizardIdx;
    },
    initWizardSteps() {
      const stepKeys = Object.values(FORM_WIZARD_STEPS);

      this.wizardSteps = this.isPaymentStepActive
        ? stepKeys
        : stepKeys.filter(({ NAME }) => NAME !== FORM_WIZARD_STEPS.CREDIT_CARD.NAME);
    },
    // HANDLER methods
    stepForward() {
      if (this.currentStepIdx < this.totalSteps) {
        this.currentStepIdx += 1;
      }
    },
    stepBackward() {
      if (this.currentStepIdx > 0) {
        this.currentStepIdx -= 1;
      }
    },
    async handleValueChange(formField) {
      await this.saveFormInfo({
        formField,
        currentStepIdx: this.currentStepIdx,
      });
    },
    async handleSelect(performanceId) {
      await this.setSelectedPerformanceId({ performanceId });
    },
    async handlePaymentChange(paymentType) {
      this.isPaymentStepActive = paymentType === PAYMENT_TYPES.CREDIT_CARD;
      this.initWizardSteps();
    },
    async handleSubmit(formValues) {
      console.info(formValues);
      this.stepForward();
      await this.saveFormInfo({ currentStepIdx: this.currentStepIdx });
    },
    async handleBackwardClick() {
      this.stepBackward();
      await this.saveFormInfo({ currentStepIdx: this.currentStepIdx });
    },
  },
};
</script>
