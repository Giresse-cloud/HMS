/**
 * Types de la Humanitarian Intelligence Library.
 * Consommables par : Guided Mapping Wizard, Intelligence Engine,
 * Smart Template Generator, Knowledge Base.
 */

/** Secteurs couverts par la bibliothèque (hors secteur générique « autre » du wizard). */
export type HumanitarianLibrarySectorId =
  | 'wash'
  | 'sante'
  | 'nutrition'
  | 'protection'
  | 'education'
  | 'securite-alimentaire'
  | 'shelter-nfi'
  | 'multi-sectoriel'

/** Méthodes de classification cartographique recommandées. */
export type RecommendedClassification =
  | 'Jenks'
  | 'Quantiles'
  | 'Égales'
  | 'Catégories naturelles'
  | 'Manuelle'
  | 'À définir'

/** Types de représentation cartographique recommandés. */
export type RecommendedMapType =
  | 'Cercles proportionnels'
  | 'Choroplèthe'
  | 'Symboles proportionnels'
  | 'Carte de densité'
  | 'Points qualitatifs'
  | 'À définir'

export type HumanitarianIndicator = {
  /** Identifiant stable (snake_case), unique au sein du secteur. */
  id: string
  /** Libellé affiché (nom de l’indicateur). */
  name: string
  /** Unité de mesure ou d’expression. */
  unit: string
  /** Type de carte recommandé pour la visualisation. */
  mapType: RecommendedMapType
  /** Palette de couleurs humanitaire recommandée. */
  colorPalette: string
  /** Méthode de classification des valeurs recommandée. */
  classification: RecommendedClassification
  /** Description métier de l’indicateur. */
  description: string
  /**
   * true pour l’entrée « Autre indicateur » — réservée à la personnalisation future.
   * @see CUSTOM_INDICATOR_PLACEHOLDER_ID
   */
  isCustomPlaceholder?: boolean
}

export type HumanitarianSectorDefinition = {
  id: HumanitarianLibrarySectorId
  /** Nom du secteur / cluster. */
  label: string
  /** Description du secteur pour l’aide contextuelle. */
  description: string
  /** Code cluster OCHA (optionnel, référence Knowledge Base). */
  clusterCode?: string
  indicators: HumanitarianIndicator[]
}

export type HumanitarianIndicatorLibrary = {
  version: string
  updatedAt: string
  sectors: HumanitarianSectorDefinition[]
}

/** ID partagé de l’indicateur personnalisable présent dans chaque secteur. */
export const CUSTOM_INDICATOR_PLACEHOLDER_ID = 'other_indicator' as const
