import type { GeographicLevel, WizardZoneId } from '../types/wizard'

/** Ligne géographique fictive pour préremplissage du template (MVP). */
export type TemplateGeoRow = {
  uid: string
  name: string
}

/** Provinces (1:1 avec les zones wizard sélectionnables). */
const PROVINCE_BY_ZONE: Record<WizardZoneId, TemplateGeoRow> = {
  'nord-kivu': { uid: 'PR001', name: 'Nord-Kivu' },
  'sud-kivu': { uid: 'PR002', name: 'Sud-Kivu' },
  ituri: { uid: 'PR003', name: 'Ituri' },
  tanganyika: { uid: 'PR004', name: 'Tanganyika' },
  maniema: { uid: 'PR005', name: 'Maniema' },
}

/** Territoires fictifs par zone provinciale. */
const TERRITOIRES_BY_ZONE: Record<WizardZoneId, TemplateGeoRow[]> = {
  'nord-kivu': [
    { uid: 'TR001', name: 'Goma' },
    { uid: 'TR002', name: 'Rutshuru' },
    { uid: 'TR003', name: 'Nyiragongo' },
  ],
  'sud-kivu': [
    { uid: 'TR004', name: 'Bukavu' },
    { uid: 'TR005', name: 'Uvira' },
    { uid: 'TR006', name: 'Kabare' },
  ],
  ituri: [
    { uid: 'TR007', name: 'Irumu' },
    { uid: 'TR008', name: 'Djugu' },
    { uid: 'TR009', name: 'Mahagi' },
  ],
  tanganyika: [
    { uid: 'TR010', name: 'Kalemie' },
    { uid: 'TR011', name: 'Moba' },
    { uid: 'TR012', name: 'Kongolo' },
  ],
  maniema: [
    { uid: 'TR013', name: 'Kindu' },
    { uid: 'TR014', name: 'Kasongo' },
    { uid: 'TR015', name: 'Punia' },
  ],
}

/** Zones de santé fictives (ex. Nord-Kivu → Goma, Karisimbi, Nyiragongo). */
const HEALTH_ZONES_BY_ZONE: Record<WizardZoneId, TemplateGeoRow[]> = {
  'nord-kivu': [
    { uid: 'HZ001', name: 'Goma' },
    { uid: 'HZ002', name: 'Karisimbi' },
    { uid: 'HZ003', name: 'Nyiragongo' },
  ],
  'sud-kivu': [
    { uid: 'HZ004', name: 'Kadutu' },
    { uid: 'HZ005', name: 'Ibanda' },
    { uid: 'HZ006', name: 'Uvira Centre' },
  ],
  ituri: [
    { uid: 'HZ007', name: 'Bunia' },
    { uid: 'HZ008', name: 'Linga' },
    { uid: 'HZ009', name: 'Rethy' },
  ],
  tanganyika: [
    { uid: 'HZ010', name: 'Kalemie' },
    { uid: 'HZ011', name: 'Nyemba' },
    { uid: 'HZ012', name: 'Moba' },
  ],
  maniema: [
    { uid: 'HZ013', name: 'Kindu' },
    { uid: 'HZ014', name: 'Kasongo' },
    { uid: 'HZ015', name: 'Alunguli' },
  ],
}

/** Aires de santé fictives par zone provinciale. */
const HEALTH_AREAS_BY_ZONE: Record<WizardZoneId, TemplateGeoRow[]> = {
  'nord-kivu': [
    { uid: 'AS001', name: 'Aire Goma Centre' },
    { uid: 'AS002', name: 'Aire Karisimbi Nord' },
    { uid: 'AS003', name: 'Aire Nyiragongo Est' },
  ],
  'sud-kivu': [
    { uid: 'AS004', name: 'Aire Bukavu Nord' },
    { uid: 'AS005', name: 'Aire Uvira Port' },
    { uid: 'AS006', name: 'Aire Kabare Sud' },
  ],
  ituri: [
    { uid: 'AS007', name: 'Aire Bunia Ville' },
    { uid: 'AS008', name: 'Aire Djugu Centre' },
    { uid: 'AS009', name: 'Aire Mahagi Ouest' },
  ],
  tanganyika: [
    { uid: 'AS010', name: 'Aire Kalemie Port' },
    { uid: 'AS011', name: 'Aire Moba Lac' },
    { uid: 'AS012', name: 'Aire Kongolo Est' },
  ],
  maniema: [
    { uid: 'AS013', name: 'Aire Kindu Ville' },
    { uid: 'AS014', name: 'Aire Kasongo Centre' },
    { uid: 'AS015', name: 'Aire Punia Nord' },
  ],
}

/** Points GPS fictifs par zone provinciale. */
const GPS_POINTS_BY_ZONE: Record<WizardZoneId, TemplateGeoRow[]> = {
  'nord-kivu': [
    { uid: 'GPS001', name: 'Site Goma — Coord. -1.6785, 29.2295' },
    { uid: 'GPS002', name: 'Site Karisimbi — Coord. -1.6078, 29.1783' },
    { uid: 'GPS003', name: 'Site Nyiragongo — Coord. -1.5201, 29.1378' },
  ],
  'sud-kivu': [
    { uid: 'GPS004', name: 'Site Bukavu — Coord. -2.4908, 28.8428' },
    { uid: 'GPS005', name: 'Site Uvira — Coord. -3.3952, 29.1378' },
    { uid: 'GPS006', name: 'Site Kabare — Coord. -2.4821, 28.7912' },
  ],
  ituri: [
    { uid: 'GPS007', name: 'Site Bunia — Coord. 1.5594, 30.2522' },
    { uid: 'GPS008', name: 'Site Djugu — Coord. 1.8921, 30.4521' },
    { uid: 'GPS009', name: 'Site Mahagi — Coord. 2.2845, 31.0312' },
  ],
  tanganyika: [
    { uid: 'GPS010', name: 'Site Kalemie — Coord. -5.9475, 29.1944' },
    { uid: 'GPS011', name: 'Site Moba — Coord. -7.0145, 29.7321' },
    { uid: 'GPS012', name: 'Site Kongolo — Coord. -5.3852, 27.0012' },
  ],
  maniema: [
    { uid: 'GPS013', name: 'Site Kindu — Coord. -2.9495, 25.9223' },
    { uid: 'GPS014', name: 'Site Kasongo — Coord. -4.4312, 26.6123' },
    { uid: 'GPS015', name: 'Site Punia — Coord. -1.7456, 26.3312' },
  ],
}

const LEVEL_ROW_SOURCE: Record<
  Exclude<GeographicLevel, never>,
  Record<WizardZoneId, TemplateGeoRow | TemplateGeoRow[]>
> = {
  province: PROVINCE_BY_ZONE,
  territoire: TERRITOIRES_BY_ZONE,
  'zone-sante': HEALTH_ZONES_BY_ZONE,
  'aire-sante': HEALTH_AREAS_BY_ZONE,
  gps: GPS_POINTS_BY_ZONE,
}

function rowsForZone(
  level: GeographicLevel,
  zoneId: WizardZoneId,
): TemplateGeoRow[] {
  const source = LEVEL_ROW_SOURCE[level][zoneId]
  if (!source) return []
  return Array.isArray(source) ? source : [source]
}

/**
 * Construit les lignes géographiques préremplies selon le niveau et les zones choisies.
 */
export function buildTemplateGeoRows(
  geographicLevel: GeographicLevel,
  selectedZones: WizardZoneId[],
): TemplateGeoRow[] {
  const rows: TemplateGeoRow[] = []
  for (const zoneId of selectedZones) {
    rows.push(...rowsForZone(geographicLevel, zoneId))
  }
  return rows
}
