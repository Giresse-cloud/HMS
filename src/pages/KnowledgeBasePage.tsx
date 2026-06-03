import { Paper, Typography } from '@mui/material'
import { PageHeader } from '../components/common/PageHeader'

export function KnowledgeBasePage() {
  return (
    <>
      <PageHeader
        title="Knowledge Base"
        description="Guides, bonnes pratiques et normes pour la cartographie humanitaire."
      />
      <Paper variant="outlined" sx={{ p: 3 }}>
        <Typography color="text.secondary">
          Les contenus pédagogiques du pilier Humanitarian Knowledge Base seront intégrés ici.
        </Typography>
      </Paper>
    </>
  )
}
