import { Box, Grid, Typography } from '@mui/material'
import { DashboardHero } from '../components/dashboard/DashboardHero'
import { KpiStatCard } from '../components/dashboard/KpiStatCard'
import { QuickActionCard } from '../components/dashboard/QuickActionCard'
import { dashboardKpis, quickActions } from '../data/dashboard.mock'

export function DashboardPage() {
  return (
    <Box sx={{ maxWidth: 1280 }}>
      <DashboardHero />

      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
        Indicateurs clés
      </Typography>
      <Grid container spacing={2.5} sx={{ mb: 4 }}>
        {dashboardKpis.map((stat) => (
          <Grid key={stat.id} size={{ xs: 12, sm: 6, lg: 3 }}>
            <KpiStatCard stat={stat} />
          </Grid>
        ))}
      </Grid>

      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
        Actions rapides
      </Typography>
      <Grid container spacing={2.5}>
        {quickActions.map((action) => (
          <Grid key={action.id} size={{ xs: 12, sm: 6 }}>
            <QuickActionCard action={action} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
