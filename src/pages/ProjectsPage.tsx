import { Paper, Typography } from '@mui/material'
import { PageHeader } from '../components/common/PageHeader'

export function ProjectsPage() {
  return (
    <>
      <PageHeader
        title="Mes projets"
        description="Retrouvez et reprenez vos projets cartographiques en cours ou terminés."
      />
      <Paper variant="outlined" sx={{ p: 3 }}>
        <Typography color="text.secondary">
          Aucun projet pour le moment. La liste et la persistance seront connectées ultérieurement.
        </Typography>
      </Paper>
    </>
  )
}
