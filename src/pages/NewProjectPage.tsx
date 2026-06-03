import { Box, Typography } from '@mui/material'
import { GuidedMappingWizard } from '../modules/wizard/GuidedMappingWizard'

export function NewProjectPage() {
  return (
    <Box sx={{ maxWidth: 960 }}>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }} gutterBottom>
        Nouveau projet
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Configurez votre collecte de données via l’assistant guidé (Guided Mapping Engine).
      </Typography>
      <GuidedMappingWizard />
    </Box>
  )
}
