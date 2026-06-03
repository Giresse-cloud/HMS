/**
 * Import & Validation Engine — MVP
 * Lecture Excel/CSV (SheetJS) et contrôle qualité des données importées.
 */

import * as XLSX from 'xlsx'
import { getIndicatorDisplay } from '../data/wizardCatalog'
import { buildWizardTemplateRows, isGpsGeographicLevel } from '../data/wizardGeography'
import type { WizardState } from '../types/wizard'
import { buildTemplateColumnPreview } from './templateColumns'

export type ValidationIssueType =
  | 'parse_error'
  | 'empty_file'
  | 'missing_column'
  | 'missing_uid'
  | 'missing_value'
  | 'unknown_row'
  | 'missing_expected_row'

export type ValidationIssue = {
  type: ValidationIssueType
  message: string
  rowNumber?: number
  column?: string
}

export type TemplateQualityReport = {
  fileName: string
  importedRowCount: number
  validRowCount: number
  missingValueCount: number
  recognizedColumns: string[]
  expectedColumns: readonly string[]
  errors: ValidationIssue[]
  unknownRowUids: string[]
  missingExpectedUids: string[]
  isReadyForMapping: boolean
}

export class TemplateImportError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'TemplateImportError'
  }
}

const ACCEPTED_EXTENSIONS = ['.xlsx', '.xls', '.csv'] as const

export function isAcceptedTemplateFile(file: File): boolean {
  const name = file.name.toLowerCase()
  return ACCEPTED_EXTENSIONS.some((ext) => name.endsWith(ext))
}

function normalizeCell(value: unknown): string {
  if (value === null || value === undefined) return ''
  return String(value).trim()
}

function rowHasContent(row: Record<string, string>): boolean {
  return Object.values(row).some((v) => v.length > 0)
}

/**
 * Lit un fichier Excel ou CSV et retourne des lignes clé/valeur (en-têtes = clés).
 */
export async function parseTemplateUploadFile(
  file: File,
): Promise<Record<string, string>[]> {
  if (!isAcceptedTemplateFile(file)) {
    throw new TemplateImportError(
      'Format non supporté. Utilisez un fichier .xlsx ou .csv généré par HMS.',
    )
  }

  const buffer = await file.arrayBuffer()
  let workbook: XLSX.WorkBook

  try {
    workbook = XLSX.read(buffer, { type: 'array' })
  } catch {
    throw new TemplateImportError('Impossible de lire le fichier. Vérifiez qu’il n’est pas corrompu.')
  }

  const sheetName = workbook.SheetNames[0]
  if (!sheetName) {
    throw new TemplateImportError('Le fichier ne contient aucune feuille de données.')
  }

  const sheet = workbook.Sheets[sheetName]
  const raw = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, {
    defval: '',
    raw: false,
  })

  return raw.map((row) => {
    const normalized: Record<string, string> = {}
    for (const [key, value] of Object.entries(row)) {
      normalized[String(key).trim()] = normalizeCell(value)
    }
    return normalized
  })
}

/**
 * Valide les données importées par rapport au template attendu (wizard state).
 */
export function validateImportedTemplate(
  state: WizardState,
  rawRows: Record<string, string>[],
  fileName: string,
): TemplateQualityReport {
  const indicatorLabel = getIndicatorDisplay(state)
  const preview = buildTemplateColumnPreview(
    state.geographicLevel,
    indicatorLabel,
    state.dataFormat,
  )
  const isGps = isGpsGeographicLevel(state.geographicLevel)

  const emptyReport = (errors: ValidationIssue[]): TemplateQualityReport => ({
    fileName,
    importedRowCount: 0,
    validRowCount: 0,
    missingValueCount: 0,
    recognizedColumns: [],
    expectedColumns: preview?.columns ?? [],
    errors,
    unknownRowUids: [],
    missingExpectedUids: [],
    isReadyForMapping: false,
  })

  if (!preview || !state.geographicLevel || !state.dataFormat) {
    return emptyReport([
      {
        type: 'parse_error',
        message:
          'Configuration wizard incomplète. Terminez les étapes précédentes (indicateur et format des données) avant d’importer.',
      },
    ])
  }

  if (!isGps && state.selectedEntityIds.length === 0) {
    return emptyReport([
      {
        type: 'parse_error',
        message: 'Aucune entité géographique sélectionnée dans le wizard.',
      },
    ])
  }

  const expectedColumns = preview.columns
  const idColumn = isGps ? preview.siteIdColumn! : preview.uidColumn!
  const nameColumn = isGps ? preview.siteNameColumn! : preview.nameColumn!
  const indicatorColumn = preview.indicatorColumn

  const expectedRows = buildWizardTemplateRows(state, {
    uidKey: idColumn,
    nameKey: nameColumn,
    indicatorKey: indicatorColumn,
  })
  const expectedIds = new Set(
    expectedRows.map((row) => row[idColumn]).filter(Boolean),
  )

  const dataRows = rawRows.filter(rowHasContent)

  if (dataRows.length === 0) {
    return emptyReport([
      {
        type: 'empty_file',
        message: 'Aucune ligne de données trouvée dans le fichier importé.',
      },
    ])
  }

  const recognizedColumns = Object.keys(dataRows[0] ?? {})
  const errors: ValidationIssue[] = []
  const unknownRowUids: string[] = []
  let missingValueCount = 0
  let validRowCount = 0

  for (const col of expectedColumns) {
    if (!recognizedColumns.includes(col)) {
      errors.push({
        type: 'missing_column',
        message: `Colonne attendue absente : « ${col} ».`,
        column: col,
      })
    }
  }

  const hasAllColumns = expectedColumns.every((c) => recognizedColumns.includes(c))
  const importedIds = new Set<string>()

  if (hasAllColumns) {
    dataRows.forEach((row, index) => {
      const rowNumber = index + 2
      const rowId = row[idColumn] ?? ''
      const indicatorValue = row[indicatorColumn] ?? ''
      const nameValue = row[nameColumn] ?? ''

      if (!rowId) {
        if (nameValue || indicatorValue) {
          errors.push({
            type: 'missing_uid',
            message: `Ligne ${rowNumber} : identifiant manquant (${idColumn}).`,
            rowNumber,
            column: idColumn,
          })
        }
        return
      }

      importedIds.add(rowId)

      if (!expectedIds.has(rowId)) {
        unknownRowUids.push(rowId)
        errors.push({
          type: 'unknown_row',
          message: `Ligne ${rowNumber} : « ${rowId} » non reconnu dans le template généré.`,
          rowNumber,
          column: idColumn,
        })
        return
      }

      if (!indicatorValue) {
        missingValueCount += 1
        errors.push({
          type: 'missing_value',
          message: `Ligne ${rowNumber} : valeur manquante pour « ${rowId} » (${indicatorColumn}).`,
          rowNumber,
          column: indicatorColumn,
        })
        return
      }

      validRowCount += 1
    })

    for (const expectedId of expectedIds) {
      if (!importedIds.has(expectedId)) {
        errors.push({
          type: 'missing_expected_row',
          message: `Ligne attendue absente pour « ${expectedId} ».`,
          column: idColumn,
        })
      }
    }
  }

  const missingExpectedUids = [...expectedIds].filter((id) => !importedIds.has(id))

  const structuralOk = hasAllColumns
  const noUnknown = unknownRowUids.length === 0
  const noMissingValues = missingValueCount === 0
  const noMissingExpected = missingExpectedUids.length === 0
  const hasValidRows = validRowCount > 0

  const isReadyForMapping =
    structuralOk && noUnknown && noMissingValues && noMissingExpected && hasValidRows

  return {
    fileName,
    importedRowCount: dataRows.length,
    validRowCount,
    missingValueCount,
    recognizedColumns,
    expectedColumns,
    errors,
    unknownRowUids: [...new Set(unknownRowUids)],
    missingExpectedUids,
    isReadyForMapping,
  }
}

/** Parse + valide en une seule opération. */
export async function importAndValidateTemplate(
  state: WizardState,
  file: File,
): Promise<TemplateQualityReport> {
  const rows = await parseTemplateUploadFile(file)
  return validateImportedTemplate(state, rows, file.name)
}
