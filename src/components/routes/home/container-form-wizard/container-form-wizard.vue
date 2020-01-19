<template>
  <form-wizard @form-submit="handleSubmit">
    <form-fields-performances
      v-if="isFirstStep"
      :performances="theaterSchedule"
      :selected-performance-schedule="performanceSchedule"
      @select="handleSelect"
    />
    <form-fields-user-info v-if="isSecondStep" />
  </form-wizard>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { FORM_WIZARD_STEPS, WIZARD_STEPS_DIRECTIONS } from '@/constants';

import { FormFieldsUserInfo } from '../form-fields-user-info';
import { FormWizard } from '../form-wizard';
import { FormFieldsPerformances } from '../form-fields-performances';

export default {
  name: 'container-form-wizard',
  components: {
    FormFieldsUserInfo,
    FormWizard,
    FormFieldsPerformances,
  },
  data() {
    return {
      wizardSteps: Object.values(FORM_WIZARD_STEPS),
    };
  },
  computed: {
    ...mapGetters('schedule', [
      'theaterSchedule',
      'performanceSchedule',
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
  },
  methods: {
    ...mapActions('schedule', ['setSelectedPerformanceId', 'makeStep']),

    async handleSelect(performanceId) {
      await this.setSelectedPerformanceId({ performanceId });
    },
    async handleSubmit(formValues) {
      console.info(formValues);
      await this.makeStep({ stepDirection: WIZARD_STEPS_DIRECTIONS.FORWARD });
    },
  },
};
</script>
