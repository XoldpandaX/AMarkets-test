import { PAYMENT_TYPES } from '@/constants';

export default {
  theaterSchedule: ({ theaterSchedule }) => theaterSchedule,
  selectedPerformanceId: ({ selectedPerformanceId }) => selectedPerformanceId,
  performanceSchedule: ({ theaterSchedule }, { selectedPerformanceId }) => (
    selectedPerformanceId
      ? theaterSchedule.filter(({ id }) => selectedPerformanceId === id)[0].sessions
      : []
  ),
  initWizardStepIdxIdxIdx: ({ initWizardStepIdxIdx }) => initWizardStepIdxIdx,
  wizardStepsQuantity: ({ wizardStepsQuantity }) => wizardStepsQuantity,

  // predicates
  isInitDataLoading: ({ isInitDataLoading }) => isInitDataLoading,
  isCardPayment: ({ paymentType }) => paymentType === PAYMENT_TYPES.CREDIT_CARD,
};
