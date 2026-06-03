import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material'
import { NavLink } from 'react-router-dom'
import { mainNavigation } from '../../data/navigation'

const DRAWER_WIDTH = 260

export function AppSidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
        },
      }}
    >
      <Box sx={{ px: 2.5, py: 2.5 }}>
        <Typography variant="h6" color="primary" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
          HMS
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
          Humanitarian Mapping Studio
        </Typography>
      </Box>
      <Divider />
      <List component="nav" aria-label="Navigation principale" sx={{ px: 1, py: 1 }}>
        {mainNavigation.map((item) => {
          const Icon = item.icon
          return (
            <ListItem key={item.id} disablePadding>
              <ListItemButton
                component={NavLink}
                to={item.path}
                end={item.path === '/'}
                sx={{
                  '&.active': {
                    color: 'primary.main',
                    '& .MuiListItemIcon-root': { color: 'primary.main' },
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <Icon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  slotProps={{ primary: { variant: 'body2', sx: { fontWeight: 500 } } }}
                />
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>
    </Drawer>
  )
}

export const SIDEBAR_WIDTH = DRAWER_WIDTH
