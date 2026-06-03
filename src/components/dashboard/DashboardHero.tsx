import { Box, Button, Typography } from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutlined'
import { Link as RouterLink } from 'react-router-dom'

export function DashboardHero() {
  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 3,
        px: { xs: 3, md: 5 },
        py: { xs: 4, md: 5 },
        mb: 4,
        color: 'primary.contrastText',
        background: 'linear-gradient(135deg, #0F2440 0%, #1B365D 45%, #418FDE 100%)',
        boxShadow: '0 12px 40px rgba(27, 54, 93, 0.25)',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: -40,
          right: -40,
          width: 200,
          height: 200,
          borderRadius: '50%',
          bgcolor: 'rgba(255,255,255,0.06)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: -60,
          left: '30%',
          width: 280,
          height: 280,
          borderRadius: '50%',
          bgcolor: 'rgba(255,255,255,0.04)',
        }}
      />
      <Box sx={{ position: 'relative', zIndex: 1, maxWidth: 640 }}>
        <Typography
          variant="overline"
          sx={{ letterSpacing: 1.5, opacity: 0.85, fontWeight: 600 }}
        >
          Plateforme cartographique humanitaire
        </Typography>
        <Typography variant="h3" component="h1" sx={{ fontWeight: 700, mt: 1, mb: 1.5 }}>
          Humanitarian Mapping Studio
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: 400, opacity: 0.92, mb: 3, lineHeight: 1.5 }}>
          Transformez vos données en cartes d&apos;action.
        </Typography>
        <Button
          component={RouterLink}
          to="/nouveau-projet"
          variant="contained"
          size="large"
          startIcon={<AddCircleOutlineIcon />}
          sx={{
            bgcolor: 'common.white',
            color: 'primary.main',
            fontWeight: 600,
            px: 3,
            '&:hover': { bgcolor: 'grey.100' },
          }}
        >
          Nouveau projet
        </Button>
      </Box>
    </Box>
  )
}
