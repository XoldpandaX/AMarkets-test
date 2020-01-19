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
import { FORM_WIZARD_STEPS, WIZARD_STEPS_DIRECTIONS } from '@/constants';

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
    this.wizardSteps = Object.values(FORM_WIZARD_STEPS);
  },
  data() {
    return {
      wizardSteps: Object.values(FORM_WIZARD_STEPS),
      currentStepIdx: 0,
      isPaymentStepActive: false,
    };
  },
  computed: {
    ...mapGetters('schedule', [
      'theaterSchedule',
      'performanceSchedule',
      'currentWizardStepIdx',
      'wizardStepsQuantity',
      'currentWizardStepIdx',
    ]),

    currentStepName() {
      return this.wizardSteps[this.currentWizardStepIdx].NAME;
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

    // form nav btns availability
    isForwardBtnAvailable() {
      return this.currentWizardStepIdx === this.wizardStepsQuantity;
    },
    isBackwardBtnAvailable() {
      return !this.currentWizardStepIdx > 0;
    },
  },
  methods: {
    ...mapActions('schedule', [
      'setSelectedPerformanceId',
      'makeStep',
      'changePaymentType',
      'makeStep',
    ]),

    async handleSelect(performanceId) {
      await this.setSelectedPerformanceId({ performanceId });
    },
    async handlePaymentChange(paymentType) {
      await this.changePaymentType({ type: paymentType });
    },
    async handleSubmit(formValues) {
      console.info(formValues);
      await this.makeStep({ stepDirection: WIZARD_STEPS_DIRECTIONS.FORWARD });
    },

    // step
    async handleBackwardClick() {
      await this.makeStep({ stepDirection: WIZARD_STEPS_DIRECTIONS.BACKWARD });
    },
  },
};
</script>
