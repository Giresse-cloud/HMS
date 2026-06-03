import { Box, Card, CardContent, Typography } from '@mui/material'
import type { KpiStat } from '../../types/dashboard'

type KpiStatCardProps = {
  stat: KpiStat
}

export function KpiStatCard({ stat }: KpiStatCardProps) {
  const Icon = stat.icon

  return (
    <Card
      elevation={0}
      sx={{
        height: '100%',
        border: '1px solid',
        borderColor: 'divider',
        transition: 'box-shadow 0.2s, transform 0.2s',
        '&:hover': {
          boxShadow: '0 8px 24px rgba(27, 54, 93, 0.1)',
          transform: 'translateY(-2px)',
        },
      }}
    >
      <CardContent sx={{ p: 2.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {stat.label}
            </Typography>
            <Typography variant="h4" component="p" sx={{ fontWeight: 700, color: 'text.primary' }}>
              {stat.value}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
              {stat.trend}
            </Typography>
          </Box>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: `${stat.color}14`,
              color: stat.color,
            }}
          >
            <Icon />
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}
