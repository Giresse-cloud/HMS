import { Box, Typography } from '@mui/material'
import type { ReactNode } from 'react'

export const WIZARD_SCROLL_HINT = 'Faites défiler pour voir plus d’éléments'

type WizardScrollablePanelProps = {
  children: ReactNode
  /** Nombre d’éléments dans la liste. */
  itemCount: number
  /** Seuil au-delà duquel le défilement est activé. */
  scrollThreshold: number
  /** Hauteur maximale du conteneur lorsque la liste est scrollable. */
  maxHeight: number | string
}

/**
 * Limite la hauteur des longues listes du wizard et affiche une indication de défilement.
 */
export function WizardScrollablePanel({
  children,
  itemCount,
  scrollThreshold,
  maxHeight,
}: WizardScrollablePanelProps) {
  const isScrollable = itemCount > scrollThreshold

  return (
    <Box>
      <Box
        sx={{
          maxHeight: isScrollable ? maxHeight : 'none',
          overflowY: isScrollable ? 'auto' : 'visible',
          overflowX: 'hidden',
          pr: isScrollable ? 0.5 : 0,
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {children}
      </Box>
      {isScrollable ? (
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ mt: 1, display: 'block', fontStyle: 'italic', textAlign: 'center' }}
        >
          {WIZARD_SCROLL_HINT}
        </Typography>
      ) : null}
    </Box>
  )
}
