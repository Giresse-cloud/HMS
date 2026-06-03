import { Paper, Typography } from '@mui/material'
import { PageHeader } from '../components/common/PageHeader'

export function LibraryPage() {
  return (
    <>
      <PageHeader
        title="Bibliothèque humanitaire"
        description="Modèles, symboles et ressources cartographiques conformes aux usages humanitaires."
      />
      <Paper variant="outlined" sx={{ p: 3 }}>
        <Typography color="text.secondary">
          Le Smart Template Generator alimentera cette bibliothèque dans les prochains sprints.
        </Typography>
      </Paper>
    </>
  )
}
