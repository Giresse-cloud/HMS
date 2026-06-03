import { Typography } from '@mui/material'
import { WIZARD_SCROLL_HINT } from './WizardScrollablePanel'

type WizardScrollHintProps = {
  visible: boolean
}

export function WizardScrollHint({ visible }: WizardScrollHintProps) {
  if (!visible) return null

  return (
    <Typography
      variant="caption"
      color="text.secondary"
      sx={{ mt: 1, display: 'block', fontStyle: 'italic', textAlign: 'center' }}
    >
      {WIZARD_SCROLL_HINT}
    </Typography>
  )
}
