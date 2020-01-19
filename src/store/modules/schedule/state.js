import { FORM_WIZARD_STEPS } from '@/constants';

export default {
  theaterSchedule: null,
  selectedPerformanceId: '',
  isInitDataLoading: false,
  currentWizardStep: 0,
  wizardStepsQuantity: Object.values(FORM_WIZARD_STEPS).length - 1,
};
