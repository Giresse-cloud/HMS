export type HumanitarianSector =
  | 'wash'
  | 'sante'
  | 'nutrition'
  | 'protection'
  | 'education'
  | 'securite-alimentaire'
  | 'shelter-nfi'
  | 'multi-sectoriel'
  | 'autre'

export type GeographicLevel =
  | 'province'
  | 'territoire'
  | 'zone-sante'
  | 'aire-sante'
  | 'gps'

/** IDs province historiques (alignés sur le registre géographique). */
export type WizardZoneId = 'nord-kivu' | 'sud-kivu' | 'ituri' | 'tanganyika' | 'maniema'

/** @deprecated Utiliser CUSTOM_INDICATOR_PLACEHOLDER_ID — alias conservé pour compatibilité. */
export const CUSTOM_INDICATOR_VALUE = 'other_indicator'

export { CUSTOM_INDICATOR_PLACEHOLDER_ID } from './humanitarianIndicators'
export type { IndicatorDataFormatId } from './indicatorDataFormat'

export type WizardState = {
  sector: HumanitarianSector | null
  indicator: string | null
  customIndicator: string
  /** Format d’expression des valeurs (préfixe colonne template). */
  dataFormat: import('./indicatorDataFormat').IndicatorDataFormatId | null
  geographicLevel: GeographicLevel | null
  /** Entités sélectionnées (province, territoire, zone ou aire selon le niveau). Vide pour GPS. */
  selectedEntityIds: string[]
}

export const initialWizardState: WizardState = {
  sector: null,
  indicator: null,
  customIndicator: '',
  dataFormat: null,
  geographicLevel: null,
  selectedEntityIds: [],
}

export const WIZARD_STEP_COUNT = 5
