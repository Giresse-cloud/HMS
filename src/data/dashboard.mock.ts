import type { KpiStat, QuickAction } from '../types/dashboard'
import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined'
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined'
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined'
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined'
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined'
import MapOutlinedIcon from '@mui/icons-material/MapOutlined'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'

export const dashboardKpis: KpiStat[] = [
  {
    id: 'projects',
    label: 'Projets créés',
    value: 12,
    trend: '+3 ce mois',
    icon: FolderOutlinedIcon,
    color: '#1B365D',
  },
  {
    id: 'maps',
    label: 'Cartes générées',
    value: 28,
    trend: '+8 ce mois',
    icon: MapOutlinedIcon,
    color: '#418FDE',
  },
  {
    id: 'templates',
    label: 'Templates disponibles',
    value: 24,
    trend: '6 secteurs couverts',
    icon: DescriptionOutlinedIcon,
    color: '#2E7D4F',
  },
  {
    id: 'exports',
    label: 'Exports réalisés',
    value: 19,
    trend: 'PDF & PNG',
    icon: FileDownloadOutlinedIcon,
    color: '#E56A54',
  },
]

export const quickActions: QuickAction[] = [
  {
    id: 'create-map',
    title: 'Créer une carte',
    description: 'Lancez l’assistant guidé pour un nouveau projet cartographique.',
    path: '/nouveau-projet',
    icon: AddLocationAltOutlinedIcon,
  },
  {
    id: 'download-template',
    title: 'Télécharger un template',
    description: 'Accédez aux modèles Excel et CSV par secteur humanitaire.',
    path: '/bibliotheque',
    icon: DownloadOutlinedIcon,
  },
  {
    id: 'explore-library',
    title: 'Explorer la bibliothèque',
    description: 'Parcourez symboles, palettes et ressources conformes OCHA.',
    path: '/bibliotheque',
    icon: MenuBookOutlinedIcon,
  },
  {
    id: 'knowledge-base',
    title: 'Consulter la Knowledge Base',
    description: 'Guides et bonnes pratiques pour vos cartes humanitaires.',
    path: '/knowledge-base',
    icon: SchoolOutlinedIcon,
  },
]
