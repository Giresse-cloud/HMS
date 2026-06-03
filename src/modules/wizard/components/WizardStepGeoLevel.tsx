import { Grid, Typography } from '@mui/material'
import { geographicLevelOptions } from '../../../data/wizardCatalog'
import type { GeographicLevel } from '../../../types/wizard'
import { WizardOptionCard } from './WizardOptionCard'

type WizardStepGeoLevelProps = {
  value: GeographicLevel | null
  onChange: (level: GeographicLevel) => void
}

export function WizardStepGeoLevel({ value, onChange }: WizardStepGeoLevelProps) {
  return (
    <>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Choisissez le niveau géographique de votre collecte ou agrégation de données.
      </Typography>
      <Grid container spacing={2}>
        {geographicLevelOptions.map((option) => (
          <Grid key={option.id} size={{ xs: 12, sm: 6 }}>
            <WizardOptionCard
              label={option.label}
              description={option.description}
              selected={value === option.id}
              onSelect={() => onChange(option.id)}
            />
          </Grid>
        ))}
      </Grid>
    </>
  )
}
