<template>
  <form-wizard
    @form-submit="handleSubmit"
    @backward-click="handleBackwardClick"
    :is-backward-btn-active="isBackwardBtnAvailable"
    :is-forward-btn-active="isForwardBtnAvailable"
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
    this.initWizardStepIdx();
  },
  data() {
    return {
      wizardSteps: null,
      currentStepIdx: 0,
      isPaymentStepActive: false,
    };
  },
  computed: {
    ...mapGetters('schedule', ['theaterSchedule', 'performanceSchedule']),

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
    ...mapActions('schedule', ['setSelectedPerformanceId']),

    initWizardStepIdx() {
      const stepKeys = Object.values(FORM_WIZARD_STEPS);

      this.wizardSteps = this.isPaymentStepActive
        ? stepKeys
        : stepKeys.filter(({ NAME }) => NAME !== FORM_WIZARD_STEPS.CREDIT_CARD.NAME);
    },
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
    async handleSelect(performanceId) {
      await this.setSelectedPerformanceId({ performanceId });
    },
    async handlePaymentChange(paymentType) {
      this.isPaymentStepActive = paymentType === PAYMENT_TYPES.CREDIT_CARD;
      this.initWizardStepIdx();
    },
    async handleSubmit(formValues) {
      console.info(formValues);
      this.stepForward();
    },
    async handleBackwardClick() {
      this.stepBackward();
    },
  },
};
</script>
