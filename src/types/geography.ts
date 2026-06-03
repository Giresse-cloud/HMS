/**
 * Humanitarian Geography Registry — types
 * Source unique pour provinces, territoires, zones et aires de santé (RDC MVP).
 */

export const HMS_GEOGRAPHY_COUNTRY = 'République démocratique du Congo' as const
export const HMS_GEOGRAPHY_COUNTRY_CODE = 'CD' as const

/** Champs hiérarchiques communs (valeurs nulles selon le niveau administratif). */
export type GeographyHierarchyFields = {
  /** Nom de la province (tous niveaux sauf pays). */
  province: string | null
  /** Nom du territoire (zone / aire de santé). */
  territory: string | null
  /** Nom de la zone de santé (aire de santé). */
  healthZone: string | null
}

export type Province = {
  id: string
  name: string
  parentId: null
  code: string
  country: typeof HMS_GEOGRAPHY_COUNTRY
  province: string
  territory: null
  healthZone: null
}

export type Territory = {
  id: string
  name: string
  /** Identifiant de la province parente. */
  parentId: string
  code: string
  country: typeof HMS_GEOGRAPHY_COUNTRY
  province: string
  territory: string
  healthZone: null
}

export type HealthZone = {
  id: string
  name: string
  /** Identifiant du territoire parent (MVP). */
  parentId: string
  code: string
  country: typeof HMS_GEOGRAPHY_COUNTRY
  province: string
  territory: string
  healthZone: string
}

export type HealthArea = {
  id: string
  name: string
  /** Identifiant de la zone de santé parente. */
  parentId: string
  code: string
  country: typeof HMS_GEOGRAPHY_COUNTRY
  province: string
  territory: string
  healthZone: string
}

export type GeographicLevelId = 'province' | 'territory' | 'health-zone' | 'health-area'

export type GeographicEntity = Province | Territory | HealthZone | HealthArea
