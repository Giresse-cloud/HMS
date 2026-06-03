import InsightsOutlinedIcon from '@mui/icons-material/InsightsOutlined'
import { Box, Divider, Paper, Typography } from '@mui/material'
import type { HumanitarianIndicator } from '../../../types/humanitarianIndicators'

type HmsRecommendationPanelProps = {
  indicator: HumanitarianIndicator
}

export function HmsRecommendationPanel({ indicator }: HmsRecommendationPanelProps) {
  const rows = [
    { label: 'Type de carte recommandé', value: indicator.mapType },
    { label: 'Palette recommandée', value: indicator.colorPalette },
    { label: 'Classification recommandée', value: indicator.classification },
    { label: 'Unité', value: indicator.unit },
  ]

  return (
    <Paper
      variant="outlined"
      sx={{
        mt: 3,
        p: 2.5,
        bgcolor: 'rgba(65, 143, 222, 0.06)',
        borderColor: 'primary.light',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
        <InsightsOutlinedIcon color="primary" fontSize="small" />
        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'primary.main' }}>
          Recommandation HMS
        </Typography>
      </Box>
      <Divider sx={{ mb: 2 }} />
      {rows.map((row) => (
        <Box
          key={row.label}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 2,
            py: 0.75,
            flexWrap: 'wrap',
          }}
        >
          <Typography variant="body2" color="text.secondary">
            {row.label}
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 600, textAlign: 'right' }}>
            {row.value}
          </Typography>
        </Box>
      ))}
    </Paper>
  )
}
