import {
  CUSTOM_INDICATOR_PLACEHOLDER_ID,
  getAllHumanitarianSectors,
  getHumanitarianIndicator,
  getHumanitarianSector,
  getIndicatorsBySector,
  getRecommendedIndicatorsBySector,
  isLibrarySectorId,
} from './humanitarianIndicators'
import type { HumanitarianIndicator } from '../types/humanitarianIndicators'
import type { GeographicLevel, HumanitarianSector, WizardZoneId } from '../types/wizard'

export type SectorOption = {
  id: HumanitarianSector
  label: string
  description: string
}

export type GeoLevelOption = {
  id: GeographicLevel
  label: string
  description: string
}

export type ZoneOption = {
  id: WizardZoneId
  label: string
}

/** Secteurs wizard : bibliothèque Humanitarian Intelligence + option « Autre ». */
export const sectorOptions: SectorOption[] = [
  ...getAllHumanitarianSectors().map((sector) => ({
    id: sector.id,
    label: sector.label,
    description: sector.description,
  })),
  {
    id: 'autre',
    label: 'Autre',
    description: 'Secteur ou thématique personnalisée hors catalogue standard.',
  },
]

export const geographicLevelOptions: GeoLevelOption[] = [
  { id: 'province', label: 'Province', description: 'Découpage administratif provincial' },
  { id: 'territoire', label: 'Territoire', description: 'Découpage territorial' },
  { id: 'zone-sante', label: 'Zone de Santé', description: 'Unité sanitaire intermédiaire' },
  { id: 'aire-sante', label: 'Aire de Santé', description: 'Unité sanitaire de proximité' },
  { id: 'gps', label: 'GPS', description: 'Points géolocalisés (coordonnées)' },
]

export const zoneOptions: ZoneOption[] = [
  { id: 'nord-kivu', label: 'Nord-Kivu' },
  { id: 'sud-kivu', label: 'Sud-Kivu' },
  { id: 'ituri', label: 'Ituri' },
  { id: 'tanganyika', label: 'Tanganyika' },
  { id: 'maniema', label: 'Maniema' },
]

export const wizardStepLabels = [
  'Secteur',
  'Indicateur',
  'Niveau géographique',
  'Zone',
  'Template',
] as const

// ─── Indicateurs (Humanitarian Intelligence Library) ─────────────────────────

/** Indicateurs recommandés pour un secteur bibliothèque (sans placeholder). */
export function getWizardRecommendedIndicators(
  sector: HumanitarianSector | null,
): readonly HumanitarianIndicator[] {
  if (!sector || !isLibrarySectorId(sector)) return []
  return getRecommendedIndicatorsBySector(sector)
}

/** Entrée « Autre indicateur » du secteur bibliothèque. */
export function getWizardCustomIndicatorPlaceholder(
  sector: HumanitarianSector | null,
): HumanitarianIndicator | undefined {
  if (!sector || !isLibrarySectorId(sector)) return undefined
  return getIndicatorsBySector(sector).find((i) => i.isCustomPlaceholder)
}

/** Métadonnées d’un indicateur sélectionné via la bibliothèque. */
export function resolveLibraryIndicator(
  sector: HumanitarianSector | null,
  indicatorId: string | null,
): HumanitarianIndicator | undefined {
  if (!sector || !indicatorId || !isLibrarySectorId(sector)) return undefined
  if (indicatorId === CUSTOM_INDICATOR_PLACEHOLDER_ID) return undefined
  return getHumanitarianIndicator(sector, indicatorId)
}

export function isCustomIndicatorSelection(indicatorId: string | null): boolean {
  return indicatorId === CUSTOM_INDICATOR_PLACEHOLDER_ID
}

// ─── Libellés résumé wizard ─────────────────────────────────────────────────

export function getSectorLabel(sector: HumanitarianSector | null): string {
  if (!sector) return '—'
  if (isLibrarySectorId(sector)) {
    return getHumanitarianSector(sector)?.label ?? sector
  }
  if (sector === 'autre') return 'Autre'
  return sector
}

export function getGeoLevelLabel(level: GeographicLevel | null): string {
  if (!level) return '—'
  return geographicLevelOptions.find((g) => g.id === level)?.label ?? level
}

/** @deprecated Utiliser getSelectedGeographySummary depuis wizardGeography. */
export function getZoneLabels(zoneIds: WizardZoneId[]): string[] {
  return zoneIds.map((id) => zoneOptions.find((z) => z.id === id)?.label ?? id)
}

export { getSelectedGeographySummary } from './wizardGeography'

export function getIndicatorDisplay(state: {
  sector: HumanitarianSector | null
  indicator: string | null
  customIndicator: string
}): string {
  if (isCustomIndicatorSelection(state.indicator)) {
    return state.customIndicator.trim() || 'Indicateur personnalisé (non renseigné)'
  }
  const resolved = resolveLibraryIndicator(state.sector, state.indicator)
  if (resolved) return resolved.name
  return '—'
}

export function getIndicatorUnit(state: {
  sector: HumanitarianSector | null
  indicator: string | null
  customIndicator: string
}): string {
  if (isCustomIndicatorSelection(state.indicator)) {
    return state.customIndicator.trim() ? 'Personnalisé' : '—'
  }
  return resolveLibraryIndicator(state.sector, state.indicator)?.unit ?? '—'
}

export { getDataFormatLabel } from './indicatorDataFormats'

export { CUSTOM_INDICATOR_PLACEHOLDER_ID }
