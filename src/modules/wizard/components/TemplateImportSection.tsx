import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined'
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined'
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined'
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material'
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined'
import { useRef, useState } from 'react'
import type { WizardState } from '../../../types/wizard'
import {
  importAndValidateTemplate,
  TemplateImportError,
} from '../../../utils/templateImportValidation'
import type { TemplateQualityReport } from '../../../utils/templateImportValidation'

type TemplateImportSectionProps = {
  state: WizardState
  disabled?: boolean
}

export function TemplateImportSection({ state, disabled = false }: TemplateImportSectionProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [loading, setLoading] = useState(false)
  const [report, setReport] = useState<TemplateQualityReport | null>(null)
  const [importError, setImportError] = useState<string | null>(null)

  const handlePickFile = () => {
    inputRef.current?.click()
  }

  const hasImportedFile = report !== null || importError !== null

  const handleResetImport = () => {
    setReport(null)
    setImportError(null)
    setLoading(false)
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setLoading(true)
    setImportError(null)
    setReport(null)

    try {
      const result = await importAndValidateTemplate(state, file)
      setReport(result)
    } catch (error) {
      setImportError(
        error instanceof TemplateImportError
          ? error.message
          : 'Échec de l’import du fichier.',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <Paper variant="outlined" sx={{ p: 3, mt: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <CloudUploadOutlinedIcon color="primary" fontSize="small" />
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          Importer le fichier complété
        </Typography>
      </Box>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Importez le template Excel ou CSV rempli. HMS contrôlera les colonnes, les UID et les
        valeurs de l’indicateur (Import &amp; Validation Engine).
      </Typography>

      <input
        ref={inputRef}
        type="file"
        accept=".xlsx,.xls,.csv"
        hidden
        onChange={handleFileChange}
      />

      <Button
        variant="outlined"
        startIcon={loading ? <CircularProgress size={18} /> : <CloudUploadOutlinedIcon />}
        onClick={handlePickFile}
        disabled={disabled || loading}
      >
        {loading ? 'Analyse en cours…' : 'Choisir un fichier (.xlsx / .csv)'}
      </Button>

      {importError ? (
        <Box sx={{ mt: 2 }}>
          <Alert severity="error">{importError}</Alert>
          {hasImportedFile ? (
            <ImportResetActions onReset={handleResetImport} showHelper />
          ) : null}
        </Box>
      ) : null}

      {report ? (
        <Box sx={{ mt: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <FactCheckOutlinedIcon color="primary" fontSize="small" />
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              Rapport qualité — {report.fileName}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            <Chip label={`${report.importedRowCount} lignes importées`} size="small" />
            <Chip
              label={`${report.validRowCount} lignes valides`}
              size="small"
              color={report.validRowCount > 0 ? 'success' : 'default'}
            />
            <Chip
              label={`${report.missingValueCount} valeurs manquantes`}
              size="small"
              color={report.missingValueCount > 0 ? 'warning' : 'default'}
            />
          </Box>

          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
            Colonnes reconnues
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
            {report.recognizedColumns.length > 0 ? (
              report.recognizedColumns.map((col) => {
                const expected = report.expectedColumns.includes(col)
                return (
                  <Chip
                    key={col}
                    label={col}
                    size="small"
                    variant={expected ? 'filled' : 'outlined'}
                    color={expected ? 'primary' : 'default'}
                  />
                )
              })
            ) : (
              <Typography variant="body2" color="text.secondary">
                Aucune
              </Typography>
            )}
          </Box>

          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
            Colonnes attendues
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, fontFamily: 'monospace', fontSize: '0.8rem' }}>
            {report.expectedColumns.join(' | ')}
          </Typography>

          {report.errors.length > 0 ? (
            <>
              <Divider sx={{ mb: 1 }} />
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                Erreurs détectées ({report.errors.length})
              </Typography>
              <List dense disablePadding sx={{ maxHeight: 200, overflow: 'auto' }}>
                {report.errors.map((issue, index) => (
                  <ListItem key={`${issue.type}-${index}`} disableGutters sx={{ py: 0.25 }}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <ErrorOutlineOutlinedIcon fontSize="small" color="error" />
                    </ListItemIcon>
                    <ListItemText
                      primary={issue.message}
                      slotProps={{ primary: { variant: 'body2' } }}
                    />
                  </ListItem>
                ))}
              </List>
            </>
          ) : null}

          {report.isReadyForMapping ? (
            <Alert severity="success" sx={{ mt: 2 }}>
              Données prêtes pour la cartographie
            </Alert>
          ) : (
            <Alert severity="warning" sx={{ mt: 2 }}>
              Corrigez les erreurs ci-dessus avant de passer à la cartographie.
            </Alert>
          )}

          <ImportResetActions
            onReset={handleResetImport}
            showHelper={!report.isReadyForMapping}
          />
        </Box>
      ) : null}
    </Paper>
  )
}

type ImportResetActionsProps = {
  onReset: () => void
  showHelper?: boolean
}

function ImportResetActions({ onReset, showHelper = false }: ImportResetActionsProps) {
  return (
    <Box sx={{ mt: 2 }}>
      {showHelper ? (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
          Vous pouvez supprimer ce fichier et importer une version corrigée.
        </Typography>
      ) : null}
      <Button
        variant="text"
        color="inherit"
        size="small"
        startIcon={<RestartAltOutlinedIcon />}
        onClick={onReset}
        sx={{ color: 'text.secondary' }}
      >
        Réinitialiser l&apos;import
      </Button>
    </Box>
  )
}
