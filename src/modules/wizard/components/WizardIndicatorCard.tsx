import { Box, Card, CardActionArea, CardContent, Chip, Radio, Typography } from '@mui/material'
import type { HumanitarianIndicator } from '../../../types/humanitarianIndicators'

type WizardIndicatorCardProps = {
  indicator: HumanitarianIndicator
  selected: boolean
  onSelect: () => void
}

export function WizardIndicatorCard({ indicator, selected, onSelect }: WizardIndicatorCardProps) {
  return (
    <Card
      variant="outlined"
      sx={{
        height: '100%',
        borderColor: selected ? 'primary.main' : 'divider',
        borderWidth: selected ? 2 : 1,
        bgcolor: selected ? 'rgba(27, 54, 93, 0.04)' : 'background.paper',
      }}
    >
      <CardActionArea onClick={onSelect} sx={{ height: '100%', alignItems: 'stretch' }}>
        <CardContent sx={{ display: 'flex', gap: 1, py: 2, height: '100%' }}>
          <Radio checked={selected} size="small" sx={{ p: 0, mt: 0.25 }} tabIndex={-1} />
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap', mb: 0.5 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                {indicator.name}
              </Typography>
              <Chip label={indicator.unit} size="small" variant="outlined" />
            </Box>
            <Typography variant="body2" color="text.secondary">
              {indicator.description}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
