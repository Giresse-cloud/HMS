/**
 * Humanitarian Intelligence Library
 * ─────────────────────────────────
 * Source centralisée des secteurs humanitaires, indicateurs recommandés
 * et métadonnées cartographiques (unité, type de carte, palette, classification).
 *
 * Consommateurs prévus :
 * - Guided Mapping Wizard (étape indicateur)
 * - Humanitarian Intelligence Engine (règles, validation, suggestions)
 * - Smart Template Generator (colonnes template, styles par défaut)
 * - Knowledge Base (fiches indicateur / secteur)
 *
 * @see HMS_PROJECT_BLUEPRINT.md — piliers Intelligence & Template Generator
 */

import type {
  HumanitarianIndicator,
  HumanitarianIndicatorLibrary,
  HumanitarianLibrarySectorId,
  HumanitarianSectorDefinition,
  RecommendedClassification,
  RecommendedMapType,
} from '../types/humanitarianIndicators'
import {
  CUSTOM_INDICATOR_PLACEHOLDER_ID,
} from '../types/humanitarianIndicators'

// ─── Helpers internes (construction de la bibliothèque) ─────────────────────

type IndicatorDefaults = {
  unit?: string
  mapType?: RecommendedMapType
  colorPalette?: string
  classification?: RecommendedClassification
}

function buildIndicator(
  id: string,
  name: string,
  description: string,
  defaults: IndicatorDefaults = {},
): HumanitarianIndicator {
  return {
    id,
    name,
    description,
    unit: defaults.unit ?? 'Nombre',
    mapType: defaults.mapType ?? 'Choroplèthe',
    colorPalette: defaults.colorPalette ?? 'Neutre OCHA',
    classification: defaults.classification ?? 'Jenks',
  }
}

function otherIndicatorPlaceholder(sectorLabel: string): HumanitarianIndicator {
  return {
    id: CUSTOM_INDICATOR_PLACEHOLDER_ID,
    name: 'Autre indicateur',
    unit: 'Personnalisé',
    mapType: 'À définir',
    colorPalette: 'Neutre HMS',
    classification: 'À définir',
    description: `Indicateur personnalisé pour le secteur ${sectorLabel}. Le libellé, l'unité et les paramètres cartographiques pourront être définis par l'utilisateur.`,
    isCustomPlaceholder: true,
  }
}

// ─── Définitions par secteur ────────────────────────────────────────────────

const santeSector: HumanitarianSectorDefinition = {
  id: 'sante',
  label: 'Santé',
  description: 'Santé publique, épidémiologie et systèmes de santé en contexte humanitaire.',
  clusterCode: 'Health',
  indicators: [
    buildIndicator(
      'cholera_cases',
      'Cas Choléra',
      'Nombre de cas suspects ou confirmés de choléra.',
      { unit: 'Cas', mapType: 'Cercles proportionnels', colorPalette: 'Rouge Santé', classification: 'Jenks' },
    ),
    buildIndicator(
      'measles_cases',
      'Cas Rougeole',
      'Nombre de cas suspects ou confirmés de rougeole.',
      { unit: 'Cas', mapType: 'Cercles proportionnels', colorPalette: 'Rouge Santé', classification: 'Jenks' },
    ),
    buildIndicator(
      'mpox_cases',
      'Cas Mpox',
      'Nombre de cas suspects ou confirmés de variole simienne (Mpox).',
      { unit: 'Cas', mapType: 'Cercles proportionnels', colorPalette: 'Rouge Santé', classification: 'Jenks' },
    ),
    buildIndicator(
      'malaria_cases',
      'Cas Paludisme',
      'Nombre de cas suspects ou confirmés de paludisme.',
      { unit: 'Cas', mapType: 'Cercles proportionnels', colorPalette: 'Rouge Santé', classification: 'Jenks' },
    ),
    buildIndicator(
      'case_fatality_rate',
      'Taux de létalité',
      'Proportion de décès parmi les cas identifiés pour une pathologie ou un contexte donné.',
      { unit: '%', mapType: 'Choroplèthe', colorPalette: 'Rouge Santé', classification: 'Quantiles' },
    ),
    buildIndicator(
      'vaccination_coverage',
      'Couverture vaccinale',
      'Part de la population cible ayant reçu la vaccination prévue.',
      { unit: '%', mapType: 'Choroplèthe', colorPalette: 'Rouge Santé', classification: 'Quantiles' },
    ),
    buildIndicator(
      'medical_consultations',
      'Consultations médicales',
      'Nombre de consultations médicales réalisées sur la période.',
      { unit: 'Consultations', mapType: 'Cercles proportionnels', colorPalette: 'Rouge Santé', classification: 'Jenks' },
    ),
    buildIndicator(
      'health_facilities_supported',
      'Structures de santé soutenues',
      'Nombre de structures de santé bénéficiant d’un appui humanitaire.',
      { unit: 'Structures', mapType: 'Symboles proportionnels', colorPalette: 'Rouge Santé', classification: 'Jenks' },
    ),
    buildIndicator(
      'health_staff_trained',
      'Personnel de santé formé',
      'Nombre de agents de santé ayant suivi une formation sur la période.',
      { unit: 'Personnes', mapType: 'Choroplèthe', colorPalette: 'Rouge Santé', classification: 'Jenks' },
    ),
    buildIndicator(
      'medicines_distributed',
      'Médicaments distribués',
      'Volume ou nombre d’unités de médicaments essentiels distribués.',
      { unit: 'Unités', mapType: 'Choroplèthe', colorPalette: 'Rouge Santé', classification: 'Jenks' },
    ),
    otherIndicatorPlaceholder('Santé'),
  ],
}

const washSector: HumanitarianSectorDefinition = {
  id: 'wash',
  label: 'WASH',
  description: 'Eau, assainissement et hygiène — accès, infrastructure et promotion comportementale.',
  clusterCode: 'WASH',
  indicators: [
    buildIndicator(
      'functional_water_points',
      'Points d\'eau fonctionnels',
      'Nombre de points d’eau opérationnels desservant la population.',
      { unit: 'Points', mapType: 'Symboles proportionnels', colorPalette: 'Bleu WASH', classification: 'Jenks' },
    ),
    buildIndicator(
      'boreholes_constructed',
      'Forages construits',
      'Nombre de forages nouvellement construits ou équipés.',
      { unit: 'Forages', mapType: 'Symboles proportionnels', colorPalette: 'Bleu WASH', classification: 'Jenks' },
    ),
    buildIndicator(
      'networks_rehabilitated',
      'Réseaux réhabilités',
      'Nombre de réseaux d’adduction ou distribution réhabilités.',
      { unit: 'Réseaux', mapType: 'Symboles proportionnels', colorPalette: 'Bleu WASH', classification: 'Jenks' },
    ),
    buildIndicator(
      'liters_per_person_per_day',
      'Litres par personne par jour',
      'Volume d’eau potable disponible par personne et par jour.',
      { unit: 'L/pers/j', mapType: 'Choroplèthe', colorPalette: 'Bleu WASH', classification: 'Quantiles' },
    ),
    buildIndicator(
      'population_served_water',
      'Population desservie',
      'Nombre de personnes ayant accès à une source d’eau améliorée.',
      { unit: 'Personnes', mapType: 'Choroplèthe', colorPalette: 'Bleu WASH', classification: 'Jenks' },
    ),
    buildIndicator(
      'latrines_constructed',
      'Latrines construites',
      'Nombre de latrines construites ou mises en service.',
      { unit: 'Latrines', mapType: 'Symboles proportionnels', colorPalette: 'Bleu WASH', classification: 'Jenks' },
    ),
    buildIndicator(
      'hygiene_kits_distributed',
      'Kits d\'hygiène distribués',
      'Nombre de kits d’hygiène distribués aux ménages ou personnes.',
      { unit: 'Kits', mapType: 'Choroplèthe', colorPalette: 'Bleu WASH', classification: 'Jenks' },
    ),
    buildIndicator(
      'hygiene_awareness_campaigns',
      'Campagnes de sensibilisation',
      'Nombre de campagnes ou sessions de promotion de l’hygiène réalisées.',
      { unit: 'Campagnes', mapType: 'Choroplèthe', colorPalette: 'Bleu WASH', classification: 'Jenks' },
    ),
    buildIndicator(
      'households_safe_water_access',
      'Ménages ayant accès à l\'eau potable',
      'Nombre de ménages disposant d’un accès durable à l’eau potable.',
      { unit: 'Ménages', mapType: 'Choroplèthe', colorPalette: 'Bleu WASH', classification: 'Jenks' },
    ),
    otherIndicatorPlaceholder('WASH'),
  ],
}

const nutritionSector: HumanitarianSectorDefinition = {
  id: 'nutrition',
  label: 'Nutrition',
  description: 'Malnutrition aiguë, programmes thérapeutiques et dépistage communautaire.',
  clusterCode: 'Nutrition',
  indicators: [
    buildIndicator(
      'sam_cases',
      'Cas MAS',
      'Nombre d’enfants ou personnes avec malnutrition aiguë sévère (MAS).',
      { unit: 'Cas', mapType: 'Cercles proportionnels', colorPalette: 'Orange Nutrition', classification: 'Jenks' },
    ),
    buildIndicator(
      'mam_cases',
      'Cas MAM',
      'Nombre d’enfants ou personnes avec malnutrition aiguë modérée (MAM).',
      { unit: 'Cas', mapType: 'Cercles proportionnels', colorPalette: 'Orange Nutrition', classification: 'Jenks' },
    ),
    buildIndicator(
      'nutrition_admissions',
      'Admissions nutritionnelles',
      'Nombre d’admissions dans les programmes de prise en charge nutritionnelle.',
      { unit: 'Admissions', mapType: 'Choroplèthe', colorPalette: 'Orange Nutrition', classification: 'Jenks' },
    ),
    buildIndicator(
      'unti_operational',
      'UNTI opérationnelles',
      'Nombre d’unités nutritionnelles thérapeutiques intensives opérationnelles.',
      { unit: 'Unités', mapType: 'Symboles proportionnels', colorPalette: 'Orange Nutrition', classification: 'Jenks' },
    ),
    buildIndicator(
      'unta_operational',
      'UNTA opérationnelles',
      'Nombre d’unités nutritionnelles thérapeutiques ambulatoires opérationnelles.',
      { unit: 'Unités', mapType: 'Symboles proportionnels', colorPalette: 'Orange Nutrition', classification: 'Jenks' },
    ),
    buildIndicator(
      'children_screened',
      'Enfants dépistés',
      'Nombre d’enfants dépistés pour malnutrition sur la période.',
      { unit: 'Enfants', mapType: 'Choroplèthe', colorPalette: 'Orange Nutrition', classification: 'Jenks' },
    ),
    buildIndicator(
      'recovery_rate',
      'Taux de guérison',
      'Proportion de cas nutritionnels guéris selon les standards SPHERE.',
      { unit: '%', mapType: 'Choroplèthe', colorPalette: 'Orange Nutrition', classification: 'Quantiles' },
    ),
    buildIndicator(
      'abandonment_rate',
      'Taux d\'abandon',
      'Proportion de cas ayant abandonné le programme avant la guérison.',
      { unit: '%', mapType: 'Choroplèthe', colorPalette: 'Orange Nutrition', classification: 'Quantiles' },
    ),
    otherIndicatorPlaceholder('Nutrition'),
  ],
}

const securiteAlimentaireSector: HumanitarianSectorDefinition = {
  id: 'securite-alimentaire',
  label: 'Sécurité Alimentaire',
  description: 'Insécurité alimentaire, transferts, moyens d’existence et analyse IPC.',
  clusterCode: 'Food Security',
  indicators: [
    buildIndicator(
      'food_assistance_beneficiaries',
      'Bénéficiaires assistance alimentaire',
      'Nombre de personnes ayant reçu une assistance alimentaire en nature.',
      { unit: 'Personnes', mapType: 'Choroplèthe', colorPalette: 'Vert Sécurité alimentaire', classification: 'Jenks' },
    ),
    buildIndicator(
      'cash_beneficiaries',
      'Bénéficiaires cash',
      'Nombre de personnes ayant reçu une assistance sous forme monétaire.',
      { unit: 'Personnes', mapType: 'Choroplèthe', colorPalette: 'Vert Sécurité alimentaire', classification: 'Jenks' },
    ),
    buildIndicator(
      'voucher_beneficiaries',
      'Bénéficiaires coupons',
      'Nombre de personnes ayant reçu des bons ou coupons alimentaires.',
      { unit: 'Personnes', mapType: 'Choroplèthe', colorPalette: 'Vert Sécurité alimentaire', classification: 'Jenks' },
    ),
    buildIndicator(
      'households_supported_fs',
      'Ménages soutenus',
      'Nombre de ménages bénéficiant d’un soutien en sécurité alimentaire.',
      { unit: 'Ménages', mapType: 'Choroplèthe', colorPalette: 'Vert Sécurité alimentaire', classification: 'Jenks' },
    ),
    buildIndicator(
      'agricultural_kits_distributed',
      'Kits agricoles distribués',
      'Nombre de kits agricoles distribués aux ménages producteurs.',
      { unit: 'Kits', mapType: 'Choroplèthe', colorPalette: 'Vert Sécurité alimentaire', classification: 'Jenks' },
    ),
    buildIndicator(
      'agricultural_inputs_distributed',
      'Intrants agricoles distribués',
      'Quantité ou nombre d’intrants agricoles (semences, outils) distribués.',
      { unit: 'Unités', mapType: 'Choroplèthe', colorPalette: 'Vert Sécurité alimentaire', classification: 'Jenks' },
    ),
    buildIndicator(
      'ipc_phase',
      'Phase IPC',
      'Phase d’insécurité alimentaire selon l’échelle IPC (1 à 5).',
      {
        unit: 'Phase IPC',
        mapType: 'Choroplèthe',
        colorPalette: 'IPC Sécurité alimentaire',
        classification: 'Catégories naturelles',
      },
    ),
    otherIndicatorPlaceholder('Sécurité Alimentaire'),
  ],
}

const protectionSector: HumanitarianSectorDefinition = {
  id: 'protection',
  label: 'Protection',
  description: 'Protection générale, enfants, genre et accès à la justice.',
  clusterCode: 'Protection',
  indicators: [
    buildIndicator(
      'protection_incidents',
      'Incidents de protection',
      'Nombre d’incidents de protection signalés et documentés.',
      { unit: 'Incidents', mapType: 'Cercles proportionnels', colorPalette: 'Violet Protection', classification: 'Jenks' },
    ),
    buildIndicator(
      'gbv_incidents',
      'Incidents VBG',
      'Nombre d’incidents de violence basée sur le genre signalés.',
      { unit: 'Incidents', mapType: 'Carte de densité', colorPalette: 'Violet Protection', classification: 'Jenks' },
    ),
    buildIndicator(
      'child_protection_cases',
      'Cas de protection de l\'enfance',
      'Nombre de cas individuels de protection de l’enfance suivis.',
      { unit: 'Cas', mapType: 'Cercles proportionnels', colorPalette: 'Violet Protection', classification: 'Jenks' },
    ),
    buildIndicator(
      'unaccompanied_children_identified',
      'ENA identifiés',
      'Nombre d’enfants non accompagnés ou séparés identifiés.',
      { unit: 'Enfants', mapType: 'Symboles proportionnels', colorPalette: 'Violet Protection', classification: 'Jenks' },
    ),
    buildIndicator(
      'unaccompanied_children_reunified',
      'ENA réunifiés',
      'Nombre d’enfants non accompagnés ou séparés réunifiés avec leur famille.',
      { unit: 'Enfants', mapType: 'Choroplèthe', colorPalette: 'Violet Protection', classification: 'Jenks' },
    ),
    buildIndicator(
      'child_friendly_spaces',
      'Espaces amis des enfants',
      'Nombre d’espaces amis des enfants opérationnels.',
      { unit: 'Espaces', mapType: 'Symboles proportionnels', colorPalette: 'Violet Protection', classification: 'Jenks' },
    ),
    buildIndicator(
      'legal_clinics_operational',
      'Cliniques juridiques opérationnelles',
      'Nombre de cliniques ou services juridiques opérationnels pour les survivants.',
      { unit: 'Structures', mapType: 'Symboles proportionnels', colorPalette: 'Violet Protection', classification: 'Jenks' },
    ),
    otherIndicatorPlaceholder('Protection'),
  ],
}

const educationSector: HumanitarianSectorDefinition = {
  id: 'education',
  label: 'Education',
  description: 'Accès à l’éducation en urgence, réintégration scolaire et soutien pédagogique.',
  clusterCode: 'Education',
  indicators: [
    buildIndicator(
      'children_reintegrated',
      'Enfants réinsérés',
      'Nombre total d’enfants réinsérés dans le système éducatif.',
      { unit: 'Enfants', mapType: 'Choroplèthe', colorPalette: 'Jaune Éducation', classification: 'Jenks' },
    ),
    buildIndicator(
      'girls_reintegrated',
      'Filles réinsérées',
      'Nombre de filles réinsérées dans le système éducatif.',
      { unit: 'Filles', mapType: 'Choroplèthe', colorPalette: 'Jaune Éducation', classification: 'Jenks' },
    ),
    buildIndicator(
      'boys_reintegrated',
      'Garçons réinsérés',
      'Nombre de garçons réinsérés dans le système éducatif.',
      { unit: 'Garçons', mapType: 'Choroplèthe', colorPalette: 'Jaune Éducation', classification: 'Jenks' },
    ),
    buildIndicator(
      'temporary_learning_spaces',
      'Espaces temporaires d\'apprentissage',
      'Nombre d’espaces temporaires d’apprentissage mis en place.',
      { unit: 'Espaces', mapType: 'Symboles proportionnels', colorPalette: 'Jaune Éducation', classification: 'Jenks' },
    ),
    buildIndicator(
      'classrooms_rehabilitated',
      'Salles de classe réhabilitées',
      'Nombre de salles de classe réhabilitées ou reconstruites.',
      { unit: 'Salles', mapType: 'Symboles proportionnels', colorPalette: 'Jaune Éducation', classification: 'Jenks' },
    ),
    buildIndicator(
      'school_kits_distributed',
      'Kits scolaires distribués',
      'Nombre de kits scolaires distribués aux élèves.',
      { unit: 'Kits', mapType: 'Choroplèthe', colorPalette: 'Jaune Éducation', classification: 'Jenks' },
    ),
    buildIndicator(
      'teachers_trained',
      'Enseignants formés',
      'Nombre d’enseignants ayant suivi une formation pédagogique ou psychosociale.',
      { unit: 'Enseignants', mapType: 'Choroplèthe', colorPalette: 'Jaune Éducation', classification: 'Jenks' },
    ),
    otherIndicatorPlaceholder('Education'),
  ],
}

const shelterNfiSector: HumanitarianSectorDefinition = {
  id: 'shelter-nfi',
  label: 'Shelter / NFI',
  description: 'Abris, articles non alimentaires et soutien aux sites de déplacés.',
  clusterCode: 'Shelter',
  indicators: [
    buildIndicator(
      'nfi_kits_distributed',
      'Kits NFI distribués',
      'Nombre de kits d’articles non alimentaires distribués.',
      { unit: 'Kits', mapType: 'Choroplèthe', colorPalette: 'Gris Shelter', classification: 'Jenks' },
    ),
    buildIndicator(
      'shelters_constructed',
      'Abris construits',
      'Nombre d’abris nouvellement construits pour les ménages.',
      { unit: 'Abris', mapType: 'Symboles proportionnels', colorPalette: 'Gris Shelter', classification: 'Jenks' },
    ),
    buildIndicator(
      'shelters_rehabilitated',
      'Abris réhabilités',
      'Nombre d’abris existants réhabilités ou améliorés.',
      { unit: 'Abris', mapType: 'Symboles proportionnels', colorPalette: 'Gris Shelter', classification: 'Jenks' },
    ),
    buildIndicator(
      'displacement_sites_supported',
      'Sites de déplacés soutenus',
      'Nombre de sites de personnes déplacées bénéficiant d’un appui shelter/NFI.',
      { unit: 'Sites', mapType: 'Symboles proportionnels', colorPalette: 'Gris Shelter', classification: 'Jenks' },
    ),
    buildIndicator(
      'remaining_hosting_capacity',
      'Capacité d\'accueil restante',
      'Places ou capacité d’accueil encore disponibles sur les sites.',
      { unit: 'Places', mapType: 'Choroplèthe', colorPalette: 'Gris Shelter', classification: 'Quantiles' },
    ),
    buildIndicator(
      'households_assisted_shelter',
      'Ménages assistés',
      'Nombre de ménages ayant reçu une assistance shelter ou NFI.',
      { unit: 'Ménages', mapType: 'Choroplèthe', colorPalette: 'Gris Shelter', classification: 'Jenks' },
    ),
    otherIndicatorPlaceholder('Shelter / NFI'),
  ],
}

const multiSectorielSector: HumanitarianSectorDefinition = {
  id: 'multi-sectoriel',
  label: 'Multi-sectoriel',
  description: 'Indicateurs transversaux de couverture, population et coordination.',
  indicators: [
    buildIndicator(
      'target_population',
      'Population ciblée',
      'Nombre de personnes identifiées comme cible de l’intervention humanitaire.',
      { unit: 'Personnes', mapType: 'Choroplèthe', colorPalette: 'Neutre OCHA', classification: 'Jenks' },
    ),
    buildIndicator(
      'population_reached',
      'Population atteinte',
      'Nombre de personnes ayant effectivement reçu une assistance.',
      { unit: 'Personnes', mapType: 'Choroplèthe', colorPalette: 'Neutre OCHA', classification: 'Jenks' },
    ),
    buildIndicator(
      'households_reached',
      'Ménages atteints',
      'Nombre de ménages ayant effectivement reçu une assistance.',
      { unit: 'Ménages', mapType: 'Choroplèthe', colorPalette: 'Neutre OCHA', classification: 'Jenks' },
    ),
    buildIndicator(
      'displaced_persons',
      'Personnes déplacées',
      'Nombre de personnes déplacées internes dans la zone d’intervention.',
      { unit: 'Personnes', mapType: 'Choroplèthe', colorPalette: 'Neutre OCHA', classification: 'Jenks' },
    ),
    buildIndicator(
      'returnees',
      'Retournés',
      'Nombre de personnes retournées dans leur zone d’origine.',
      { unit: 'Personnes', mapType: 'Choroplèthe', colorPalette: 'Neutre OCHA', classification: 'Jenks' },
    ),
    buildIndicator(
      'active_partners',
      'Partenaires actifs',
      'Nombre d’organisations partenaires actives sur l’intervention.',
      { unit: 'Organisations', mapType: 'Points qualitatifs', colorPalette: 'Neutre OCHA', classification: 'Manuelle' },
    ),
    otherIndicatorPlaceholder('Multi-sectoriel'),
  ],
}

// ─── Bibliothèque exportée ──────────────────────────────────────────────────

/** Ordre d’affichage recommandé (clusters humanitaires). */
const sectorDefinitions: HumanitarianSectorDefinition[] = [
  washSector,
  santeSector,
  nutritionSector,
  protectionSector,
  educationSector,
  securiteAlimentaireSector,
  shelterNfiSector,
  multiSectorielSector,
]

/**
 * Humanitarian Intelligence Library — instance principale.
 * Indexée par secteur pour des lookups O(1).
 */
export const humanitarianIndicatorLibrary: HumanitarianIndicatorLibrary = {
  version: '1.0.0',
  updatedAt: '2026-06-03',
  sectors: sectorDefinitions,
}

/** Index secteur → définition complète. */
export const humanitarianSectorsById: Readonly<
  Record<HumanitarianLibrarySectorId, HumanitarianSectorDefinition>
> = Object.freeze(
  sectorDefinitions.reduce(
    (acc, sector) => {
      acc[sector.id] = sector
      return acc
    },
    {} as Record<HumanitarianLibrarySectorId, HumanitarianSectorDefinition>,
  ),
)

/** Index global indicateur → { secteur, indicateur } (clé : `${sectorId}:${indicatorId}`). */
const indicatorIndex = new Map<
  string,
  { sector: HumanitarianSectorDefinition; indicator: HumanitarianIndicator }
>()

for (const sector of sectorDefinitions) {
  for (const indicator of sector.indicators) {
    indicatorIndex.set(`${sector.id}:${indicator.id}`, { sector, indicator })
  }
}

// ─── API de consultation (consommée par les moteurs HMS) ────────────────────

/** Liste ordonnée de tous les secteurs de la bibliothèque. */
export function getAllHumanitarianSectors(): readonly HumanitarianSectorDefinition[] {
  return humanitarianIndicatorLibrary.sectors
}

/** Récupère un secteur par identifiant. */
export function getHumanitarianSector(
  sectorId: HumanitarianLibrarySectorId,
): HumanitarianSectorDefinition | undefined {
  return humanitarianSectorsById[sectorId]
}

/** Liste des indicateurs d’un secteur (y compris « Autre indicateur »). */
export function getIndicatorsBySector(
  sectorId: HumanitarianLibrarySectorId,
): readonly HumanitarianIndicator[] {
  return humanitarianSectorsById[sectorId]?.indicators ?? []
}

/** Indicateurs recommandés uniquement (exclut le placeholder personnalisable). */
export function getRecommendedIndicatorsBySector(
  sectorId: HumanitarianLibrarySectorId,
): readonly HumanitarianIndicator[] {
  return getIndicatorsBySector(sectorId).filter((i) => !i.isCustomPlaceholder)
}

/** Récupère un indicateur dans un secteur donné. */
export function getHumanitarianIndicator(
  sectorId: HumanitarianLibrarySectorId,
  indicatorId: string,
): HumanitarianIndicator | undefined {
  return indicatorIndex.get(`${sectorId}:${indicatorId}`)?.indicator
}

/** Recherche un indicateur par ID sur l’ensemble des secteurs. */
export function findHumanitarianIndicator(indicatorId: string): {
  sector: HumanitarianSectorDefinition
  indicator: HumanitarianIndicator
} | undefined {
  for (const sector of sectorDefinitions) {
    const indicator = sector.indicators.find((i) => i.id === indicatorId)
    if (indicator) return { sector, indicator }
  }
  return undefined
}

/** Vérifie si un ID de secteur est couvert par la bibliothèque. */
export function isLibrarySectorId(id: string): id is HumanitarianLibrarySectorId {
  return id in humanitarianSectorsById
}

/** Nombre total d’indicateurs (tous secteurs, hors placeholders). */
export function countRecommendedIndicators(): number {
  return sectorDefinitions.reduce(
    (sum, s) => sum + s.indicators.filter((i) => !i.isCustomPlaceholder).length,
    0,
  )
}

// Réexport des types utiles pour les consommateurs de la bibliothèque
export type {
  HumanitarianIndicator,
  HumanitarianIndicatorLibrary,
  HumanitarianLibrarySectorId,
  HumanitarianSectorDefinition,
  RecommendedClassification,
  RecommendedMapType,
} from '../types/humanitarianIndicators'

export { CUSTOM_INDICATOR_PLACEHOLDER_ID } from '../types/humanitarianIndicators'
