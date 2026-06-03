import { Box, Card, CardActionArea, CardContent, Typography } from '@mui/material'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { Link as RouterLink } from 'react-router-dom'
import type { QuickAction } from '../../types/dashboard'

type QuickActionCardProps = {
  action: QuickAction
}

export function QuickActionCard({ action }: QuickActionCardProps) {
  const Icon = action.icon

  return (
    <Card
      elevation={0}
      sx={{
        height: '100%',
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      <CardActionArea
        component={RouterLink}
        to={action.path}
        sx={{ height: '100%', alignItems: 'stretch' }}
      >
        <CardContent sx={{ p: 2.5, height: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: 2,
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
              }}
            >
              <Icon fontSize="small" />
            </Box>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }} gutterBottom>
                {action.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {action.description}
              </Typography>
            </Box>
            <ChevronRightIcon sx={{ color: 'text.disabled', mt: 0.5 }} />
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
