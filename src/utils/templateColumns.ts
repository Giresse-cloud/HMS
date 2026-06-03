import {
  buildPrefixedIndicatorColumnName,
} from '../data/indicatorDataFormats'
import {
  GPS_TEMPLATE_SITE_ID,
  GPS_TEMPLATE_SITE_NAME,
  GPS_TEMPLATE_USER_NOTE,
  isGpsGeographicLevel,
} from '../data/wizardGeography'
import { GPS_COLUMN_LATITUDE, GPS_COLUMN_LONGITUDE } from './gpsCoordinates'
import type { IndicatorDataFormatId } from '../types/indicatorDataFormat'
import type { GeographicLevel } from '../types/wizard'

/** Colonnes géographiques administratives par niveau. */
const ADMIN_GEO_COLUMNS: Record<
  Exclude<GeographicLevel, 'gps'>,
  { uid: string; name: string }
> = {
  province: { uid: 'Province_UID', name: 'Province_Name' },
  territoire: { uid: 'Territoire_UID', name: 'Territoire_Name' },
  'zone-sante': { uid: 'ZoneSante_UID', name: 'ZoneSante_Name' },
  'aire-sante': { uid: 'AireSante_UID', name: 'AireSante_Name' },
}

export { GPS_TEMPLATE_USER_NOTE }

/** Convertit un libellé d’indicateur en segment de nom de colonne (sans préfixe format). */
export function toTemplateColumnName(indicatorLabel: string): string {
  const normalized = indicatorLabel
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/['']/g, '')
  return normalized
    .trim()
    .replace(/[^a-zA-Z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
}

export type TemplateColumnPreview = {
  geographicLevel: GeographicLevel
  columns: readonly string[]
  previewLine: string
  indicatorColumn: string
  dataFormat: IndicatorDataFormatId | null
  /** Administratif */
  uidColumn?: string
  nameColumn?: string
  /** GPS */
  siteIdColumn?: string
  siteNameColumn?: string
  latitudeColumn?: string
  longitudeColumn?: string
  isGps: boolean
}

export function buildTemplateColumnPreview(
  geographicLevel: GeographicLevel | null,
  indicatorLabel: string,
  dataFormat: IndicatorDataFormatId | null,
): TemplateColumnPreview | null {
  if (!geographicLevel || !indicatorLabel.trim() || !dataFormat) return null

  const indicatorColumn = buildPrefixedIndicatorColumnName(indicatorLabel, dataFormat)

  if (isGpsGeographicLevel(geographicLevel)) {
    const columns = [
      GPS_TEMPLATE_SITE_ID,
      GPS_TEMPLATE_SITE_NAME,
      GPS_COLUMN_LATITUDE,
      GPS_COLUMN_LONGITUDE,
      indicatorColumn,
    ] as const

    return {
      geographicLevel,
      columns,
      previewLine: columns.join(' | '),
      indicatorColumn,
      dataFormat,
      siteIdColumn: GPS_TEMPLATE_SITE_ID,
      siteNameColumn: GPS_TEMPLATE_SITE_NAME,
      latitudeColumn: GPS_COLUMN_LATITUDE,
      longitudeColumn: GPS_COLUMN_LONGITUDE,
      isGps: true,
    }
  }

  const adminLevel = geographicLevel as Exclude<GeographicLevel, 'gps'>
  const geo = ADMIN_GEO_COLUMNS[adminLevel]
  const columns = [geo.uid, geo.name, indicatorColumn] as const

  return {
    geographicLevel,
    columns,
    previewLine: columns.join(' | '),
    indicatorColumn,
    dataFormat,
    uidColumn: geo.uid,
    nameColumn: geo.name,
    isGps: false,
  }
}
