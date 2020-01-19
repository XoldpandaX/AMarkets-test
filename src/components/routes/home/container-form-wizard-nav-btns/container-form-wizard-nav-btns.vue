<template>
  <form-wizard-nav-btns
    :is-backward-btn-active="isBackwardBtnAvailable"
    :is-forward-btn-active="isForwardBtnAvailable"
    @backward-click="handleBackwardClick"
  />
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { WIZARD_STEPS_DIRECTIONS } from '@/constants';

import { FormWizardNavBtns } from '../form-wizard-nav-btns';

export default {
  name: 'container-form-wizard-nav-btns',
  components: {
    FormWizardNavBtns,
  },
  computed: {
    ...mapGetters('schedule', ['wizardStepsQuantity', 'currentWizardStepIdx']),

    isForwardBtnAvailable() {
      return this.currentWizardStepIdx === this.wizardStepsQuantity;
    },
    isBackwardBtnAvailable() {
      return !this.currentWizardStepIdx > 0;
    },
  },
  methods: {
    ...mapActions('schedule', ['makeStep']),

    async handleBackwardClick() {
      await this.makeStep({ stepDirection: WIZARD_STEPS_DIRECTIONS.BACKWARD });
    },
  },
};
</script>
