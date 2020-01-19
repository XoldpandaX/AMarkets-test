export default {
  theaterSchedule: ({ theaterSchedule }) => theaterSchedule,
  isInitDataLoading: ({ isInitDataLoading }) => isInitDataLoading,
  selectedPerformanceId: ({ selectedPerformanceId }) => selectedPerformanceId,
  performanceSchedule: ({ theaterSchedule }, { selectedPerformanceId }) => (
    selectedPerformanceId
      ? theaterSchedule.filter(({ id }) => selectedPerformanceId === id)[0].sessions
      : []
  ),
  currentWizardStepIdx: ({ currentWizardStep }) => currentWizardStep,
  wizardStepsQuantity: ({ wizardStepsQuantity }) => wizardStepsQuantity,
};
