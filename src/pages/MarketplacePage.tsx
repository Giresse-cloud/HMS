import { Paper, Typography } from '@mui/material'
import { PageHeader } from '../components/common/PageHeader'

export function MarketplacePage() {
  return (
    <>
      <PageHeader
        title="Marketplace"
        description="Extensions, templates communautaires et ressources partagées."
      />
      <Paper variant="outlined" sx={{ p: 3 }}>
        <Typography color="text.secondary">
          Le marketplace est prévu pour une phase ultérieure de la plateforme HMS.
        </Typography>
      </Paper>
    </>
  )
}
