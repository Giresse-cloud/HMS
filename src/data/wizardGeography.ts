/**
 * Pont Guided Mapping Wizard ↔ Humanitarian Geography Registry
 */

import {
  getHealthArea,
  getHealthAreas,
  getHealthZone,
  getHealthZones,
  getProvince,
  getProvinces,
  getTerritories,
  getTerritory,
} from './geography'
import type { GeographicLevel, WizardState } from '../types/wizard'
import { GPS_COLUMN_LATITUDE, GPS_COLUMN_LONGITUDE } from '../utils/gpsCoordinates'

export const GPS_TEMPLATE_SITE_ID = 'Site_ID' as const
export const GPS_TEMPLATE_SITE_NAME = 'Site_Name' as const

export const GPS_TEMPLATE_USER_NOTE =
  'Chaque ligne doit représenter un site ou un point GPS avec ses coordonnées et la valeur de l’indicateur à visualiser.'

export type GeographySelectionOption = {
  entityId: string
  entityName: string
  entityCode: string
  /** Libellé principal (ex. Karisimbi). */
  primaryLabel: string
  /** Contexte hiérarchique (ex. Nord-Kivu — Goma). */
  contextLabel: string
  province: string
  territory: string | null
  healthZone: string | null
}

export type TemplateGeoRow = Record<string, string>

export function isGpsGeographicLevel(level: GeographicLevel | null): boolean {
  return level === 'gps'
}

export function wizardSkipsZoneSelection(level: GeographicLevel | null): boolean {
  return isGpsGeographicLevel(level)
}

/** Options affichées à l’étape Zone selon le niveau géographique. */
export function getGeographySelectionOptions(
  geographicLevel: GeographicLevel,
): GeographySelectionOption[] {
  switch (geographicLevel) {
    case 'province':
      return getProvinces().map((p) => ({
        entityId: p.id,
        entityName: p.name,
        entityCode: p.code,
        primaryLabel: p.name,
        contextLabel: p.country,
        province: p.province,
        territory: null,
        healthZone: null,
      }))
    case 'territoire':
      return getTerritories().map((t) => ({
        entityId: t.id,
        entityName: t.name,
        entityCode: t.code,
        primaryLabel: t.name,
        contextLabel: t.province,
        province: t.province,
        territory: t.territory,
        healthZone: null,
      }))
    case 'zone-sante':
      return getHealthZones().map((z) => ({
        entityId: z.id,
        entityName: z.name,
        entityCode: z.code,
        primaryLabel: z.name,
        contextLabel: [z.province, z.territory].filter(Boolean).join(' — '),
        province: z.province,
        territory: z.territory,
        healthZone: z.healthZone,
      }))
    case 'aire-sante':
      return getHealthAreas().map((a) => ({
        entityId: a.id,
        entityName: a.name,
        entityCode: a.code,
        primaryLabel: a.name,
        contextLabel: [a.healthZone, a.province, a.territory].filter(Boolean).join(' — '),
        province: a.province,
        territory: a.territory,
        healthZone: a.healthZone,
      }))
    case 'gps':
      return []
    default:
      return []
  }
}

/** Libellés pour le résumé projet. */
export function getSelectedGeographySummary(state: WizardState): string {
  if (!state.geographicLevel) return '—'
  if (isGpsGeographicLevel(state.geographicLevel)) {
    return 'Non applicable (collecte par coordonnées GPS)'
  }
  if (state.selectedEntityIds.length === 0) return '—'

  const options = getGeographySelectionOptions(state.geographicLevel)
  const labels = state.selectedEntityIds
    .map((id) => options.find((o) => o.entityId === id)?.primaryLabel ?? id)
    .filter(Boolean)

  return labels.join(', ')
}

/** Métadonnées de contexte cartographique (couches parentes — futur moteur carte). */
export function getGeographyContextForSelection(
  geographicLevel: GeographicLevel,
  entityId: string,
): GeographySelectionOption | undefined {
  return getGeographySelectionOptions(geographicLevel).find((o) => o.entityId === entityId)
}

const GPS_PLACEHOLDER_SITES = [
  { id: 'SITE001', name: 'Site 1' },
  { id: 'SITE002', name: 'Site 2' },
  { id: 'SITE003', name: 'Site 3' },
] as const

/** Lignes template préremplies (registry + GPS). */
export function buildWizardTemplateRows(
  state: WizardState,
  columns: { uidKey: string; nameKey: string; indicatorKey: string },
): TemplateGeoRow[] {
  if (!state.geographicLevel) return []

  if (isGpsGeographicLevel(state.geographicLevel)) {
    return GPS_PLACEHOLDER_SITES.map((site) => ({
      [GPS_TEMPLATE_SITE_ID]: site.id,
      [GPS_TEMPLATE_SITE_NAME]: site.name,
      [GPS_COLUMN_LATITUDE]: '',
      [GPS_COLUMN_LONGITUDE]: '',
      [columns.indicatorKey]: '',
    }))
  }

  if (state.selectedEntityIds.length === 0) return []

  return state.selectedEntityIds
    .map((id) => resolveTemplateRow(state.geographicLevel!, id, columns))
    .filter((row): row is TemplateGeoRow => row !== null)
}

function resolveTemplateRow(
  level: GeographicLevel,
  entityId: string,
  columns: { uidKey: string; nameKey: string; indicatorKey: string },
): TemplateGeoRow | null {
  switch (level) {
    case 'province': {
      const p = getProvince(entityId)
      if (!p) return null
      return {
        [columns.uidKey]: p.code,
        [columns.nameKey]: p.name,
        [columns.indicatorKey]: '',
      }
    }
    case 'territoire': {
      const t = getTerritory(entityId)
      if (!t) return null
      return {
        [columns.uidKey]: t.code,
        [columns.nameKey]: t.name,
        [columns.indicatorKey]: '',
      }
    }
    case 'zone-sante': {
      const z = getHealthZone(entityId)
      if (!z) return null
      return {
        [columns.uidKey]: z.code,
        [columns.nameKey]: z.name,
        [columns.indicatorKey]: '',
      }
    }
    case 'aire-sante': {
      const a = getHealthArea(entityId)
      if (!a) return null
      return {
        [columns.uidKey]: a.code,
        [columns.nameKey]: a.name,
        [columns.indicatorKey]: '',
      }
    }
    default:
      return null
  }
}
