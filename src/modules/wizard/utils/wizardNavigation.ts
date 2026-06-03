import { wizardSkipsZoneSelection } from '../../../data/wizardGeography'
import { WIZARD_STEP_COUNT } from '../../../types/wizard'
import type { GeographicLevel } from '../../../types/wizard'

export function getNextWizardStep(
  currentStep: number,
  geographicLevel: GeographicLevel | null,
): number {
  if (currentStep === 2 && wizardSkipsZoneSelection(geographicLevel)) {
    return 4
  }
  return Math.min(currentStep + 1, WIZARD_STEP_COUNT - 1)
}

export function getPreviousWizardStep(
  currentStep: number,
  geographicLevel: GeographicLevel | null,
): number {
  if (currentStep === 4 && wizardSkipsZoneSelection(geographicLevel)) {
    return 2
  }
  return Math.max(currentStep - 1, 0)
}

/** Index affiché dans le Stepper MUI (masque l’étape Zone pour GPS). */
export function toStepperDisplayIndex(
  activeStep: number,
  geographicLevel: GeographicLevel | null,
): number {
  if (wizardSkipsZoneSelection(geographicLevel) && activeStep >= 4) {
    return activeStep - 1
  }
  return activeStep
}

export function getVisibleWizardStepLabels(
  labels: readonly string[],
  geographicLevel: GeographicLevel | null,
): string[] {
  if (wizardSkipsZoneSelection(geographicLevel)) {
    return labels.filter((_, index) => index !== 3)
  }
  return [...labels]
}
