import { Box, Grid, TextField, Typography } from '@mui/material'
import { WizardScrollablePanel } from '../../../components/common/WizardScrollablePanel'
import {
  CUSTOM_INDICATOR_PLACEHOLDER_ID,
  getWizardCustomIndicatorPlaceholder,
  getWizardRecommendedIndicators,
  isCustomIndicatorSelection,
  resolveLibraryIndicator,
} from '../../../data/wizardCatalog'
import { isLibrarySectorId } from '../../../data/humanitarianIndicators'
import type { IndicatorDataFormatId } from '../../../types/indicatorDataFormat'
import type { HumanitarianSector } from '../../../types/wizard'
import { HmsRecommendationPanel } from './HmsRecommendationPanel'
import { IndicatorDataFormatSelector } from './IndicatorDataFormatSelector'
import { WizardIndicatorCard } from './WizardIndicatorCard'
import { WizardOptionCard } from './WizardOptionCard'

type WizardStepIndicatorProps = {
  sector: HumanitarianSector | null
  indicator: string | null
  customIndicator: string
  dataFormat: IndicatorDataFormatId | null
  onSelectIndicator: (indicatorId: string) => void
  onCustomIndicatorChange: (value: string) => void
  onDataFormatChange: (format: IndicatorDataFormatId) => void
}

export function WizardStepIndicator({
  sector,
  indicator,
  customIndicator,
  dataFormat,
  onSelectIndicator,
  onCustomIndicatorChange,
  onDataFormatChange,
}: WizardStepIndicatorProps) {
  if (!sector) {
    return (
      <Typography color="text.secondary">
        Veuillez d’abord sélectionner un secteur à l’étape précédente.
      </Typography>
    )
  }

  const isAutreSector = sector === 'autre'
  const recommended = isAutreSector ? [] : getWizardRecommendedIndicators(sector)
  const otherPlaceholder = isAutreSector
    ? null
    : getWizardCustomIndicatorPlaceholder(sector)

  const selectedFromLibrary = resolveLibraryIndicator(sector, indicator)
  const showCustomField =
    isAutreSector || isCustomIndicatorSelection(indicator)

  const indicatorName =
    isCustomIndicatorSelection(indicator) && customIndicator.trim()
      ? customIndicator.trim()
      : selectedFromLibrary?.name ?? ''

  const showFormatSelector =
    Boolean(indicator) &&
    indicatorName.length > 0 &&
    (!isCustomIndicatorSelection(indicator) || customIndicator.trim().length > 0)

  const handleSelectOther = () => {
    onSelectIndicator(CUSTOM_INDICATOR_PLACEHOLDER_ID)
  }

  return (
    <>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        {isAutreSector
          ? 'Définissez un indicateur personnalisé pour votre secteur.'
          : 'Indicateurs recommandés issus de la Humanitarian Intelligence Library.'}
      </Typography>

      {!isAutreSector && isLibrarySectorId(sector) ? (
        <Box>
          <WizardScrollablePanel
            itemCount={recommended.length}
            scrollThreshold={5}
            maxHeight={400}
          >
            <Grid container spacing={2}>
              {recommended.map((item) => (
                <Grid key={item.id} size={{ xs: 12 }}>
                  <WizardIndicatorCard
                    indicator={item}
                    selected={indicator === item.id}
                    onSelect={() => onSelectIndicator(item.id)}
                  />
                </Grid>
              ))}
            </Grid>
          </WizardScrollablePanel>
          {otherPlaceholder ? (
            <Box sx={{ mt: 2 }}>
              <WizardOptionCard
                label={otherPlaceholder.name}
                description={otherPlaceholder.description}
                selected={isCustomIndicatorSelection(indicator)}
                onSelect={handleSelectOther}
              />
            </Box>
          ) : null}
        </Box>
      ) : (
        <WizardOptionCard
          label="Autre indicateur"
          description="Saisissez un libellé et une unité personnalisés."
          selected={isCustomIndicatorSelection(indicator) || isAutreSector}
          onSelect={handleSelectOther}
        />
      )}

      {showCustomField ? (
        <Box sx={{ mt: 3 }}>
          <TextField
            fullWidth
            label="Libellé de l’indicateur"
            placeholder="Ex. : Taux de couverture des interventions X"
            value={customIndicator}
            onChange={(e) => onCustomIndicatorChange(e.target.value)}
            helperText="Ce libellé apparaîtra dans le résumé et l’aperçu des colonnes du template."
          />
        </Box>
      ) : null}

      {selectedFromLibrary ? <HmsRecommendationPanel indicator={selectedFromLibrary} /> : null}

      {showFormatSelector ? (
        <IndicatorDataFormatSelector
          indicatorName={indicatorName}
          indicatorId={indicator}
          value={dataFormat}
          onChange={onDataFormatChange}
        />
      ) : null}
    </>
  )
}
