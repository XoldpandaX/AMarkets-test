<template>
  <form-wizard
    @form-submit="handleSubmit"
    @field-value-change="throttledHandleValueChange"
    @backward-click="handleBackwardClick"
    :init-values="savedFormFields"
    :is-backward-btn-active="isBackwardBtnAvailable"
    :is-form-sending="isFormDataSending"
    :current-step-name="currentStepName"
  >
    <form-fields-performances
      v-if="isFirstStep"
      :performances="theaterSchedule"
      :selected-performance-schedule="performanceSchedule"
      @performance-select="handleSelect"
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
import isString from 'lodash.isstring';
import { FORM_WIZARD_STEPS, PAYMENT_TYPES } from '@/constants';
import { trimWhitespaces, getRandomInt } from '@/utils';

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
    this.isPaymentStepActive = this.isCardPayment;
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
      'isCardPayment',
      'isFormDataSending',
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
    isStepFinal() {
      return this.totalSteps === this.currentStepIdx;
    },
    isBackwardBtnAvailable() {
      return !this.currentStepIdx > 0;
    },
  },
  methods: {
    ...mapActions('schedule', ['setSelectedPerformanceId', 'saveFormInfo', 'sendFormData']),

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
      const [key, value] = Object.entries(formField)[0];

      await this.saveFormInfo({
        formField: (
          isString(value) && key !== FORM_WIZARD_STEPS.SCHEDULE.FIELDS.SCHEDULE
            ? { [key]: trimWhitespaces(value) }
            : { ...formField }
        ),
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
    async handleSubmit() {
      if (!this.isStepFinal) {
        this.stepForward();
        await this.saveFormInfo({ currentStepIdx: this.currentStepIdx });
      } else {
        await this.sendFormData({
          isCardPayment: this.isPaymentStepActive,
          isSuccessError: getRandomInt(2) !== 0,
        });
      }
    },
    async handleBackwardClick() {
      this.stepBackward();
      await this.saveFormInfo({ currentStepIdx: this.currentStepIdx });
    },
  },
};
</script>
