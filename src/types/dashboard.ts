import type { SvgIconComponent } from '@mui/icons-material'

export type KpiStat = {
  id: string
  label: string
  value: number
  trend: string
  icon: SvgIconComponent
  color: string
}

export type QuickAction = {
  id: string
  title: string
  description: string
  path: string
  icon: SvgIconComponent
}
