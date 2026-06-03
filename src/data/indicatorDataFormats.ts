/**
 * Règles de format des données d’indicateur — wizard & Smart Template Generator.
 */

import { CUSTOM_INDICATOR_PLACEHOLDER_ID } from '../types/humanitarianIndicators'
import type { IndicatorDataFormatId, IndicatorDataFormatOption } from '../types/indicatorDataFormat'
import { toTemplateColumnName } from '../utils/templateColumns'

export const INDICATOR_DATA_FORMAT_OPTIONS: IndicatorDataFormatOption[] = [
  {
    id: 'absolute',
    label: 'Nombre absolu',
    columnPrefix: 'Nombre_',
    mvpPrimary: true,
  },
  {
    id: 'percentage',
    label: 'Pourcentage',
    columnPrefix: 'Pourcentage_',
    uiPrefix: '%',
    mvpPrimary: true,
  },
  {
    id: 'rate',
    label: 'Taux',
    columnPrefix: 'Taux_',
    mvpPrimary: false,
  },
  {
    id: 'ratio',
    label: 'Ratio',
    columnPrefix: 'Ratio_',
    mvpPrimary: false,
  },
  {
    id: 'score',
    label: 'Score / catégorie',
    columnPrefix: 'Score_',
    mvpPrimary: false,
  },
]

type FormatRule = IndicatorDataFormatId | 'user_choice'

/** Valeur par défaut ou choix utilisateur obligatoire par ID d’indicateur (bibliothèque). */
const DEFAULT_FORMAT_BY_INDICATOR_ID: Record<string, FormatRule> = {
  // Santé — cas → nombre absolu
  cholera_cases: 'absolute',
  measles_cases: 'absolute',
  mpox_cases: 'absolute',
  malaria_cases: 'absolute',
  medical_consultations: 'absolute',
  health_facilities_supported: 'absolute',
  health_staff_trained: 'absolute',
  medicines_distributed: 'absolute',
  vaccination_coverage: 'percentage',
  case_fatality_rate: 'percentage',

  // WASH
  functional_water_points: 'user_choice',
  boreholes_constructed: 'absolute',
  networks_rehabilitated: 'absolute',
  liters_per_person_per_day: 'ratio',
  population_served_water: 'absolute',
  latrines_constructed: 'absolute',
  hygiene_kits_distributed: 'absolute',
  hygiene_awareness_campaigns: 'absolute',
  households_safe_water_access: 'percentage',

  // Nutrition
  sam_cases: 'absolute',
  mam_cases: 'absolute',
  nutrition_admissions: 'absolute',
  unti_operational: 'absolute',
  unta_operational: 'absolute',
  children_screened: 'absolute',
  recovery_rate: 'percentage',
  abandonment_rate: 'percentage',

  // Sécurité alimentaire
  food_assistance_beneficiaries: 'absolute',
  cash_beneficiaries: 'absolute',
  voucher_beneficiaries: 'absolute',
  households_supported_fs: 'absolute',
  agricultural_kits_distributed: 'absolute',
  agricultural_inputs_distributed: 'absolute',
  ipc_phase: 'score',

  // Protection, éducation, shelter — majoritairement absolu
  protection_incidents: 'absolute',
  gbv_incidents: 'absolute',
  child_protection_cases: 'absolute',
  unaccompanied_children_identified: 'absolute',
  unaccompanied_children_reunified: 'absolute',
  child_friendly_spaces: 'absolute',
  legal_clinics_operational: 'absolute',
  children_reintegrated: 'absolute',
  girls_reintegrated: 'absolute',
  boys_reintegrated: 'absolute',
  temporary_learning_spaces: 'absolute',
  classrooms_rehabilitated: 'absolute',
  school_kits_distributed: 'absolute',
  teachers_trained: 'absolute',
  nfi_kits_distributed: 'absolute',
  shelters_constructed: 'absolute',
  shelters_rehabilitated: 'absolute',
  displacement_sites_supported: 'absolute',
  remaining_hosting_capacity: 'absolute',
  households_assisted_shelter: 'absolute',

  // Multi-sectoriel
  target_population: 'absolute',
  population_reached: 'absolute',
  households_reached: 'absolute',
  displaced_persons: 'absolute',
  returnees: 'absolute',
  active_partners: 'absolute',
}

export function getDataFormatOption(
  formatId: IndicatorDataFormatId,
): IndicatorDataFormatOption | undefined {
  return INDICATOR_DATA_FORMAT_OPTIONS.find((o) => o.id === formatId)
}

export function getDataFormatLabel(formatId: IndicatorDataFormatId | null): string {
  if (!formatId) return '—'
  return getDataFormatOption(formatId)?.label ?? formatId
}

/** Indicateurs pour lesquels l’utilisateur doit choisir entre au moins deux formats (ex. absolu vs %). */
export function indicatorRequiresFormatChoice(indicatorId: string | null): boolean {
  if (!indicatorId) return false
  return DEFAULT_FORMAT_BY_INDICATOR_ID[indicatorId] === 'user_choice'
}

/**
 * Format suggéré à la sélection d’un indicateur.
 * null = l’utilisateur doit choisir (ex. Points d’eau fonctionnels).
 */
export function resolveDefaultDataFormat(
  indicatorId: string | null,
): IndicatorDataFormatId | null {
  if (!indicatorId) return null
  if (indicatorId === CUSTOM_INDICATOR_PLACEHOLDER_ID) {
    return 'absolute'
  }
  const rule = DEFAULT_FORMAT_BY_INDICATOR_ID[indicatorId]
  if (!rule || rule === 'user_choice') {
    return null
  }
  return rule
}

/** Libellé UI de la colonne indicateur (ex. « % Points d'eau fonctionnels »). */
export function getIndicatorValueDisplayLabel(
  indicatorName: string,
  formatId: IndicatorDataFormatId,
): string {
  const option = getDataFormatOption(formatId)
  if (option?.uiPrefix) {
    return `${option.uiPrefix} ${indicatorName}`
  }
  if (formatId === 'absolute') {
    return `Nombre — ${indicatorName}`
  }
  return `${option?.label ?? formatId} — ${indicatorName}`
}

/** Nom de colonne template avec préfixe (sans symbole %). */
export function buildPrefixedIndicatorColumnName(
  indicatorName: string,
  formatId: IndicatorDataFormatId,
): string {
  const option = getDataFormatOption(formatId)
  const base = toTemplateColumnName(indicatorName)
  const prefix = option?.columnPrefix ?? 'Nombre_'
  return `${prefix}${base}`
}
