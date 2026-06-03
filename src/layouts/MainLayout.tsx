import { Box, Toolbar } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { AppSidebar, SIDEBAR_WIDTH } from '../components/layout/AppSidebar'

export function MainLayout() {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppSidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: `calc(100% - ${SIDEBAR_WIDTH}px)`,
          minHeight: '100vh',
        }}
      >
        <Toolbar sx={{ minHeight: 16 }} />
        <Box sx={{ px: { xs: 2, sm: 3, md: 4 }, pb: 4, width: '100%' }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}
