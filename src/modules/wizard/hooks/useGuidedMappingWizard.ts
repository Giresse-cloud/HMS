import { useCallback, useMemo, useState } from 'react'
import { isCustomIndicatorSelection } from '../../../data/wizardCatalog'
import { wizardSkipsZoneSelection } from '../../../data/wizardGeography'
import { initialWizardState, WIZARD_STEP_COUNT } from '../../../types/wizard'
import type { WizardState } from '../../../types/wizard'
import {
  getNextWizardStep,
  getPreviousWizardStep,
  getVisibleWizardStepLabels,
  toStepperDisplayIndex,
} from '../utils/wizardNavigation'
import { wizardStepLabels } from '../../../data/wizardCatalog'

export function useGuidedMappingWizard() {
  const [activeStep, setActiveStep] = useState(0)
  const [state, setState] = useState<WizardState>(initialWizardState)

  const updateState = useCallback((patch: Partial<WizardState>) => {
    setState((prev) => ({ ...prev, ...patch }))
  }, [])

  const resetWizard = useCallback(() => {
    setActiveStep(0)
    setState(initialWizardState)
  }, [])

  const isStepValid = useMemo(() => {
    switch (activeStep) {
      case 0:
        return state.sector !== null
      case 1:
        if (!state.indicator) return false
        if (isCustomIndicatorSelection(state.indicator)) {
          if (state.customIndicator.trim().length === 0) return false
        }
        return state.dataFormat !== null
      case 2:
        return state.geographicLevel !== null
      case 3:
        if (wizardSkipsZoneSelection(state.geographicLevel)) {
          return true
        }
        return state.selectedEntityIds.length > 0
      case 4:
        return true
      default:
        return false
    }
  }, [activeStep, state])

  const goNext = useCallback(() => {
    if (!isStepValid) return
    const next = getNextWizardStep(activeStep, state.geographicLevel)
    if (next !== activeStep) {
      setActiveStep(next)
    }
  }, [activeStep, isStepValid, state.geographicLevel])

  const goBack = useCallback(() => {
    setActiveStep(getPreviousWizardStep(activeStep, state.geographicLevel))
  }, [activeStep, state.geographicLevel])

  const visibleStepLabels = useMemo(
    () => getVisibleWizardStepLabels(wizardStepLabels, state.geographicLevel),
    [state.geographicLevel],
  )

  const stepperDisplayIndex = toStepperDisplayIndex(activeStep, state.geographicLevel)

  return {
    activeStep,
    state,
    updateState,
    resetWizard,
    isStepValid,
    goNext,
    goBack,
    isFirstStep: activeStep === 0,
    isLastStep: activeStep === WIZARD_STEP_COUNT - 1,
    visibleStepLabels,
    stepperDisplayIndex,
    skipsZoneStep: wizardSkipsZoneSelection(state.geographicLevel),
  }
}
