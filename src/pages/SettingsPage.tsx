import { Paper, Typography } from '@mui/material'
import { PageHeader } from '../components/common/PageHeader'

export function SettingsPage() {
  return (
    <>
      <PageHeader
        title="Paramètres"
        description="Préférences du compte, de l’organisation et de l’application."
      />
      <Paper variant="outlined" sx={{ p: 3 }}>
        <Typography color="text.secondary">
          Les paramètres utilisateur et organisation seront configurables dans un sprint dédié.
        </Typography>
      </Paper>
    </>
  )
}
