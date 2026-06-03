import { Grid, Typography } from '@mui/material'
import { sectorOptions } from '../../../data/wizardCatalog'
import type { HumanitarianSector } from '../../../types/wizard'
import { WizardOptionCard } from './WizardOptionCard'

type WizardStepSectorProps = {
  value: HumanitarianSector | null
  onChange: (sector: HumanitarianSector) => void
}

export function WizardStepSector({ value, onChange }: WizardStepSectorProps) {
  return (
    <>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Sélectionnez le secteur humanitaire qui correspond à votre carte.
      </Typography>
      <Grid container spacing={2}>
        {sectorOptions.map((option) => (
          <Grid key={option.id} size={{ xs: 12, sm: 6, md: 4 }}>
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
