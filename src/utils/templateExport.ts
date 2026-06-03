/**
 * Smart Template Generator — export MVP
 * Génère des fichiers Excel (.xlsx) et CSV téléchargeables côté client.
 */

import * as XLSX from 'xlsx'
import { buildWizardTemplateRows, isGpsGeographicLevel } from '../data/wizardGeography'
import { getGeoLevelLabel, getIndicatorDisplay, getSectorLabel } from '../data/wizardCatalog'
import type { WizardState } from '../types/wizard'
import { buildTemplateColumnPreview, toTemplateColumnName } from './templateColumns'

export type TemplateDataset = {
  columns: readonly string[]
  rows: Record<string, string>[]
  fileNameBase: string
}

export type TemplateExportResult = {
  success: true
  fileName: string
  rowCount: number
}

export class TemplateExportError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'TemplateExportError'
  }
}

/** Segment de nom de fichier sans accents ni caractères spéciaux. */
export function toFileNameSegment(value: string): string {
  return toTemplateColumnName(value) || 'HMS'
}

/**
 * Construit le jeu de données du template (colonnes + lignes préremplies).
 */
export function buildTemplateDataset(state: WizardState): TemplateDataset | null {
  const indicatorLabel = getIndicatorDisplay(state)
  const preview = buildTemplateColumnPreview(
    state.geographicLevel,
    indicatorLabel,
    state.dataFormat,
  )

  if (!preview || !state.geographicLevel || !state.dataFormat) {
    return null
  }

  const isGps = isGpsGeographicLevel(state.geographicLevel)
  if (!isGps && state.selectedEntityIds.length === 0) {
    return null
  }

  const rows = buildWizardTemplateRows(state, {
    uidKey: preview.uidColumn ?? preview.siteIdColumn ?? 'Site_ID',
    nameKey: preview.nameColumn ?? preview.siteNameColumn ?? 'Site_Name',
    indicatorKey: preview.indicatorColumn,
  })

  if (rows.length === 0) {
    return null
  }

  const fileNameBase = buildTemplateFileName(state, preview.indicatorColumn)

  return {
    columns: preview.columns,
    rows,
    fileNameBase,
  }
}

/** Nom de fichier : HMS_Template_Sante_Cas_Cholera_Province */
export function buildTemplateFileName(
  state: WizardState,
  indicatorColumnName: string,
): string {
  const sectorPart = toFileNameSegment(
    state.sector ? getSectorLabel(state.sector) : 'Projet',
  )
  const indicatorPart = indicatorColumnName
  const geoPart = toFileNameSegment(
    state.geographicLevel ? getGeoLevelLabel(state.geographicLevel) : 'Geo',
  )
  return `HMS_Template_${sectorPart}_${indicatorPart}_${geoPart}`
}

function triggerBrowserDownload(blob: Blob, fileName: string): void {
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = fileName
  anchor.rel = 'noopener'
  document.body.appendChild(anchor)
  anchor.click()
  document.body.removeChild(anchor)
  URL.revokeObjectURL(url)
}

function getDatasetOrThrow(state: WizardState): TemplateDataset {
  const dataset = buildTemplateDataset(state)
  if (!dataset) {
    throw new TemplateExportError(
      'Impossible de générer le template. Vérifiez le secteur, l’indicateur, le niveau géographique et la sélection géographique.',
    )
  }
  return dataset
}

/**
 * Télécharge un fichier Excel (.xlsx) avec en-têtes et lignes préremplies.
 */
export function downloadTemplateExcel(state: WizardState): TemplateExportResult {
  const dataset = getDatasetOrThrow(state)
  const fileName = `${dataset.fileNameBase}.xlsx`

  const worksheet = XLSX.utils.json_to_sheet(dataset.rows, {
    header: [...dataset.columns],
    skipHeader: false,
  })
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Collecte')
  XLSX.writeFile(workbook, fileName)

  return { success: true, fileName, rowCount: dataset.rows.length }
}

/**
 * Télécharge un fichier CSV (UTF-8 avec BOM pour compatibilité Excel).
 */
export function downloadTemplateCsv(state: WizardState): TemplateExportResult {
  const dataset = getDatasetOrThrow(state)
  const fileName = `${dataset.fileNameBase}.csv`

  const worksheet = XLSX.utils.json_to_sheet(dataset.rows, {
    header: [...dataset.columns],
    skipHeader: false,
  })
  const csvContent = XLSX.utils.sheet_to_csv(worksheet)
  const blob = new Blob(['\uFEFF', csvContent], { type: 'text/csv;charset=utf-8;' })
  triggerBrowserDownload(blob, fileName)

  return { success: true, fileName, rowCount: dataset.rows.length }
}

/** Indique si l’état wizard permet un export template. */
export function canExportTemplate(state: WizardState): boolean {
  return buildTemplateDataset(state) !== null
}
