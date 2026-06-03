import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutlined'
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined'
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined'
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined'
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import type { NavItem } from '../types/navigation'

export const mainNavigation: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Tableau de bord',
    path: '/',
    icon: DashboardOutlinedIcon,
  },
  {
    id: 'new-project',
    label: 'Nouveau projet',
    path: '/nouveau-projet',
    icon: AddCircleOutlineIcon,
  },
  {
    id: 'projects',
    label: 'Mes projets',
    path: '/mes-projets',
    icon: FolderOutlinedIcon,
  },
  {
    id: 'library',
    label: 'Bibliothèque humanitaire',
    path: '/bibliotheque',
    icon: MenuBookOutlinedIcon,
  },
  {
    id: 'knowledge-base',
    label: 'Knowledge Base',
    path: '/knowledge-base',
    icon: SchoolOutlinedIcon,
  },
  {
    id: 'marketplace',
    label: 'Marketplace',
    path: '/marketplace',
    icon: StorefrontOutlinedIcon,
  },
  {
    id: 'settings',
    label: 'Paramètres',
    path: '/parametres',
    icon: SettingsOutlinedIcon,
  },
]
