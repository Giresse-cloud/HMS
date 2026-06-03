/**
 * GPS coordinate handling — règles futures (Import & Validation / cartographie).
 *
 * Formats à supporter ultérieurement :
 * 1. Décimal avec point   : -1.6789, 29.2295
 * 2. Décimal avec virgule : -1,6789 ; 29,2295
 * 3. DMS (degrés, minutes, secondes) : 1°40'43"S, 29°13'46"E
 *
 * Colonnes template HMS (niveau GPS) :
 * - Latitude
 * - Longitude
 */

export const GPS_COLUMN_LATITUDE = 'Latitude' as const
export const GPS_COLUMN_LONGITUDE = 'Longitude' as const

export type GpsCoordinateFormat = 'decimal_dot' | 'decimal_comma' | 'dms' | 'unknown'

/**
 * Placeholder — détection du format (implémentation future).
 * @returns Format détecté sans conversion pour l’instant.
 */
export function detectGpsCoordinateFormat(_value: string): GpsCoordinateFormat {
  // TODO(Sprint cartographie) : parser point, virgule et DMS
  return 'unknown'
}

/**
 * Placeholder — conversion vers décimal WGS84 (implémentation future).
 */
export function parseGpsCoordinateToDecimal(_value: string, _format?: GpsCoordinateFormat): number | null {
  // TODO(Sprint cartographie) : normaliser virgule → point, parser DMS
  return null
}

/**
 * Placeholder — validation paire lat/lon (implémentation future).
 */
export function validateGpsCoordinatePair(_latitude: string, _longitude: string): boolean {
  // TODO(Sprint validation GPS) : bornes RDC approximatives + formats
  return false
}
