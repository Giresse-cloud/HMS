/**
 * Humanitarian Geography Registry
 * ───────────────────────────────
 * Référentiel géographique central HMS (RDC MVP).
 *
 * Consommateurs prévus :
 * - Guided Mapping Wizard (sélection de zones)
 * - Smart Template Generator (UID / noms)
 * - Import & Validation Engine (contrôle des UID)
 * - Cartographie (futur MapLibre / GeoJSON)
 */

import type { HealthArea, HealthZone, Province, Territory } from '../../types/geography'
import { healthAreas } from './healthAreas'
import { healthZones } from './healthZones'
import { provinces } from './provinces'
import { territories } from './territories'

export { provinces } from './provinces'
export { territories } from './territories'
export { healthZones } from './healthZones'
export { healthAreas } from './healthAreas'

export const GEOGRAPHY_REGISTRY_VERSION = '1.0.0-mvp' as const

// ─── Index O(1) ───────────────────────────────────────────────────────────────

const provinceById = new Map(provinces.map((p) => [p.id, p]))
const territoryById = new Map(territories.map((t) => [t.id, t]))
const healthZoneById = new Map(healthZones.map((z) => [z.id, z]))
const healthAreaById = new Map(healthAreas.map((a) => [a.id, a]))

const territoriesByProvinceId = territories.reduce<Map<string, Territory[]>>((acc, t) => {
  const list = acc.get(t.parentId) ?? []
  list.push(t)
  acc.set(t.parentId, list)
  return acc
}, new Map())

const healthZonesByProvinceId = healthZones.reduce<Map<string, HealthZone[]>>((acc, z) => {
  const province = provinces.find((p) => p.name === z.province)
  if (!province) return acc
  const list = acc.get(province.id) ?? []
  list.push(z)
  acc.set(province.id, list)
  return acc
}, new Map())

const healthZonesByTerritoryId = healthZones.reduce<Map<string, HealthZone[]>>((acc, z) => {
  const list = acc.get(z.parentId) ?? []
  list.push(z)
  acc.set(z.parentId, list)
  return acc
}, new Map())

const healthAreasByHealthZoneId = healthAreas.reduce<Map<string, HealthArea[]>>((acc, a) => {
  const list = acc.get(a.parentId) ?? []
  list.push(a)
  acc.set(a.parentId, list)
  return acc
}, new Map())

// ─── Provinces ────────────────────────────────────────────────────────────────

export function getProvinces(): readonly Province[] {
  return provinces
}

export function getProvince(id: string): Province | undefined {
  return provinceById.get(id)
}

// ─── Territoires ──────────────────────────────────────────────────────────────

export function getTerritories(): readonly Territory[] {
  return territories
}

export function getTerritory(id: string): Territory | undefined {
  return territoryById.get(id)
}

export function getTerritoriesByProvince(provinceId: string): readonly Territory[] {
  return territoriesByProvinceId.get(provinceId) ?? []
}

// ─── Zones de santé ───────────────────────────────────────────────────────────

export function getHealthZones(): readonly HealthZone[] {
  return healthZones
}

export function getHealthZone(id: string): HealthZone | undefined {
  return healthZoneById.get(id)
}

export function getHealthZonesByProvince(provinceId: string): readonly HealthZone[] {
  return healthZonesByProvinceId.get(provinceId) ?? []
}

export function getHealthZonesByTerritory(territoryId: string): readonly HealthZone[] {
  return healthZonesByTerritoryId.get(territoryId) ?? []
}

// ─── Aires de santé ───────────────────────────────────────────────────────────

export function getHealthAreas(): readonly HealthArea[] {
  return healthAreas
}

export function getHealthArea(id: string): HealthArea | undefined {
  return healthAreaById.get(id)
}

export function getHealthAreasByHealthZone(healthZoneId: string): readonly HealthArea[] {
  return healthAreasByHealthZoneId.get(healthZoneId) ?? []
}

/** IDs de province alignés sur le wizard (`WizardZoneId`). */
export function isWizardProvinceId(id: string): boolean {
  return provinceById.has(id)
}
