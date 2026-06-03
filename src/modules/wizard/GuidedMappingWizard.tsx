import {
  Box,
  Button,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import { wizardStepLabels } from '../../data/wizardCatalog'
import { CUSTOM_INDICATOR_PLACEHOLDER_ID, isCustomIndicatorSelection } from '../../data/wizardCatalog'
import { resolveDefaultDataFormat } from '../../data/indicatorDataFormats'
import type { IndicatorDataFormatId } from '../../types/indicatorDataFormat'
import type { HumanitarianSector, GeographicLevel } from '../../types/wizard'
import { useGuidedMappingWizard } from './hooks/useGuidedMappingWizard'
import { WizardStepSector } from './components/WizardStepSector'
import { WizardStepIndicator } from './components/WizardStepIndicator'
import { WizardStepGeoLevel } from './components/WizardStepGeoLevel'
import { WizardStepZone } from './components/WizardStepZone'
import { WizardStepDownload } from './components/WizardStepDownload'

export function GuidedMappingWizard() {
  const {
    activeStep,
    state,
    updateState,
    resetWizard,
    isStepValid,
    goNext,
    goBack,
    isFirstStep,
    isLastStep,
    visibleStepLabels,
    stepperDisplayIndex,
    skipsZoneStep,
  } = useGuidedMappingWizard()

  const handleSectorChange = (sector: HumanitarianSector) => {
    updateState({
      sector,
      indicator: sector === 'autre' ? CUSTOM_INDICATOR_PLACEHOLDER_ID : null,
      customIndicator: '',
      dataFormat: sector === 'autre' ? 'absolute' : null,
    })
  }

  const handleIndicatorChange = (indicatorId: string) => {
    updateState({
      indicator: indicatorId,
      customIndicator: isCustomIndicatorSelection(indicatorId) ? state.customIndicator : '',
      dataFormat: resolveDefaultDataFormat(indicatorId),
    })
  }

  const handleDataFormatChange = (dataFormat: IndicatorDataFormatId) => {
    updateState({ dataFormat })
  }

  const handleGeoLevelChange = (geographicLevel: GeographicLevel) => {
    updateState({
      geographicLevel,
      selectedEntityIds: [],
    })
  }

  const handleToggleEntity = (entityId: string) => {
    const selectedEntityIds = state.selectedEntityIds.includes(entityId)
      ? state.selectedEntityIds.filter((id) => id !== entityId)
      : [...state.selectedEntityIds, entityId]
    updateState({ selectedEntityIds })
  }

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return <WizardStepSector value={state.sector} onChange={handleSectorChange} />
      case 1:
        return (
          <WizardStepIndicator
            sector={state.sector}
            indicator={state.indicator}
            customIndicator={state.customIndicator}
            dataFormat={state.dataFormat}
            onSelectIndicator={handleIndicatorChange}
            onCustomIndicatorChange={(customIndicator) => updateState({ customIndicator })}
            onDataFormatChange={handleDataFormatChange}
          />
        )
      case 2:
        return (
          <WizardStepGeoLevel
            value={state.geographicLevel}
            onChange={handleGeoLevelChange}
          />
        )
      case 3:
        if (skipsZoneStep) {
          return null
        }
        return (
          <WizardStepZone
            geographicLevel={state.geographicLevel}
            selectedEntityIds={state.selectedEntityIds}
            onToggleEntity={handleToggleEntity}
          />
        )
      case 4:
        return <WizardStepDownload state={state} />
      default:
        return null
    }
  }

  const mobileStepLabel =
    visibleStepLabels[stepperDisplayIndex] ?? wizardStepLabels[activeStep]

  return (
    <Paper
      elevation={0}
      sx={{
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 3,
        overflow: 'hidden',
      }}
    >
      <Box sx={{ px: { xs: 2, sm: 3 }, py: 3, bgcolor: 'grey.50', borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }} gutterBottom>
          Guided Mapping Wizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Assistant pas à pas — configurez votre template de collecte.
        </Typography>
        <Stepper
          activeStep={stepperDisplayIndex}
          alternativeLabel
          sx={{ mt: 3, display: { xs: 'none', md: 'flex' } }}
        >
          {visibleStepLabels.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: { xs: 'block', md: 'none' } }}>
          Étape {stepperDisplayIndex + 1} / {visibleStepLabels.length} — {mobileStepLabel}
        </Typography>
      </Box>

      <Box sx={{ p: { xs: 2, sm: 3 }, minHeight: 320 }}>{renderStepContent()}</Box>

      <Box
        sx={{
          px: { xs: 2, sm: 3 },
          py: 2,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1.5,
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: 1,
          borderColor: 'divider',
          bgcolor: 'background.paper',
        }}
      >
        <Button
          startIcon={<RestartAltIcon />}
          color="inherit"
          onClick={resetWizard}
          size="small"
        >
          Recommencer
        </Button>
        <Box sx={{ display: 'flex', gap: 1.5 }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={goBack}
            disabled={isFirstStep}
          >
            Précédent
          </Button>
          {!isLastStep ? (
            <Button
              variant="contained"
              endIcon={<ArrowForwardIcon />}
              onClick={goNext}
              disabled={!isStepValid}
            >
              Suivant
            </Button>
          ) : null}
        </Box>
      </Box>
    </Paper>
  )
}
