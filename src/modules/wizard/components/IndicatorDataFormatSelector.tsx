import { Box, Chip, FormControl, FormLabel, Grid, Typography } from '@mui/material'
import {
  buildPrefixedIndicatorColumnName,
  getIndicatorValueDisplayLabel,
  INDICATOR_DATA_FORMAT_OPTIONS,
  indicatorRequiresFormatChoice,
} from '../../../data/indicatorDataFormats'
import type { IndicatorDataFormatId } from '../../../types/indicatorDataFormat'

type IndicatorDataFormatSelectorProps = {
  indicatorName: string
  indicatorId: string | null
  value: IndicatorDataFormatId | null
  onChange: (format: IndicatorDataFormatId) => void
}

export function IndicatorDataFormatSelector({
  indicatorName,
  indicatorId,
  value,
  onChange,
}: IndicatorDataFormatSelectorProps) {
  const mvpOptions = INDICATOR_DATA_FORMAT_OPTIONS.filter((o) => o.mvpPrimary)
  const advancedOptions = INDICATOR_DATA_FORMAT_OPTIONS.filter((o) => !o.mvpPrimary)
  const mustChoose = indicatorRequiresFormatChoice(indicatorId)

  return (
    <Box sx={{ mt: 4 }}>
      <FormControl component="fieldset" fullWidth>
        <FormLabel component="legend" sx={{ fontWeight: 600, color: 'text.primary', mb: 1 }}>
          Format des données
        </FormLabel>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {mustChoose
            ? `Cet indicateur peut être exprimé en nombre absolu ou en pourcentage. Choisissez le format de votre collecte pour « ${indicatorName} ».`
            : 'Précisez comment les valeurs seront saisies dans le template.'}
        </Typography>

        <Grid container spacing={1.5}>
          {mvpOptions.map((option) => (
            <Grid key={option.id} size={{ xs: 12, sm: 6 }}>
              <Chip
                label={option.label}
                onClick={() => onChange(option.id)}
                color={value === option.id ? 'primary' : 'default'}
                variant={value === option.id ? 'filled' : 'outlined'}
                sx={{ width: '100%', justifyContent: 'flex-start', py: 2.5, height: 'auto' }}
              />
            </Grid>
          ))}
        </Grid>

        <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
          Formats avancés (prochainement)
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 0.5, opacity: 0.55 }}>
          {advancedOptions.map((option) => (
            <Chip
              key={option.id}
              label={option.label}
              size="small"
              variant="outlined"
              disabled
            />
          ))}
        </Box>

        {value ? (
          <Box
            sx={{
              mt: 2,
              p: 2,
              borderRadius: 1,
              bgcolor: 'rgba(27, 54, 93, 0.04)',
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
              Aperçu colonne indicateur
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600, mt: 0.5 }}>
              {getIndicatorValueDisplayLabel(indicatorName, value)}
            </Typography>
            <Typography
              variant="caption"
              sx={{ fontFamily: 'monospace', mt: 0.5, display: 'block' }}
            >
              {buildPrefixedIndicatorColumnName(indicatorName, value)}
            </Typography>
          </Box>
        ) : null}
      </FormControl>
    </Box>
  )
}
