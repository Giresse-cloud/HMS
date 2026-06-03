/**
 * Format d’expression des valeurs d’indicateur (colonnes template préfixées).
 */

export type IndicatorDataFormatId = 'absolute' | 'percentage' | 'rate' | 'ratio' | 'score'

export type IndicatorDataFormatOption = {
  id: IndicatorDataFormatId
  /** Libellé UI (ex. Pourcentage). */
  label: string
  /** Préfixe colonne Excel/CSV (ex. Pourcentage_). */
  columnPrefix: string
  /** Affiché en UI avant le nom d’indicateur (ex. %). */
  uiPrefix?: string
  /** Disponible et mis en avant dans le MVP wizard. */
  mvpPrimary: boolean
}
