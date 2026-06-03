import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import ViewColumnOutlinedIcon from '@mui/icons-material/ViewColumnOutlined'
import {
  Alert,
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { useMemo, useState } from 'react'
import {
  getDataFormatLabel,
  getGeoLevelLabel,
  getIndicatorDisplay,
  getIndicatorUnit,
  getSectorLabel,
  getSelectedGeographySummary,
} from '../../../data/wizardCatalog'
import { buildWizardTemplateRows, GPS_TEMPLATE_USER_NOTE, isGpsGeographicLevel } from '../../../data/wizardGeography'
import type { WizardState } from '../../../types/wizard'
import { buildTemplateColumnPreview } from '../../../utils/templateColumns'
import {
  canExportTemplate,
  downloadTemplateCsv,
  downloadTemplateExcel,
  TemplateExportError,
} from '../../../utils/templateExport'
import { TemplateImportSection } from './TemplateImportSection'

type WizardStepDownloadProps = {
  state: WizardState
}

export function WizardStepDownload({ state }: WizardStepDownloadProps) {
  const [snackbar, setSnackbar] = useState<{
    open: boolean
    message: string
    severity: 'success' | 'error'
  }>({
    open: false,
    message: '',
    severity: 'success',
  })

  const indicatorLabel = getIndicatorDisplay(state)
  const isGps = isGpsGeographicLevel(state.geographicLevel)

  const templatePreview = useMemo(
    () => buildTemplateColumnPreview(state.geographicLevel, indicatorLabel, state.dataFormat),
    [state.geographicLevel, indicatorLabel, state.dataFormat],
  )

  const previewTableRows = useMemo(() => {
    if (!templatePreview || !state.geographicLevel) return []
    const rows = buildWizardTemplateRows(state, {
      uidKey: templatePreview.uidColumn ?? templatePreview.siteIdColumn ?? 'Site_ID',
      nameKey: templatePreview.nameColumn ?? templatePreview.siteNameColumn ?? 'Site_Name',
      indicatorKey: templatePreview.indicatorColumn,
    })
    return rows.map((row, index) => ({
      id: `preview-${index}`,
      cells: templatePreview.columns.map((col) => row[col] ?? '—'),
    }))
  }, [state, templatePreview])

  const exportReady = canExportTemplate(state)

  const summaryItems = [
    { label: 'Secteur', value: getSectorLabel(state.sector) },
    { label: 'Indicateur', value: indicatorLabel },
    { label: 'Format des données', value: getDataFormatLabel(state.dataFormat) },
    { label: 'Unité', value: getIndicatorUnit(state) },
    { label: 'Niveau géographique', value: getGeoLevelLabel(state.geographicLevel) },
    {
      label: isGps ? 'Zones' : 'Sélection géographique',
      value: getSelectedGeographySummary(state),
    },
    ...(isGps && templatePreview
      ? [
          {
            label: 'Template GPS',
            value: templatePreview.previewLine,
          },
        ]
      : []),
  ]

  const handleDownload = (format: 'excel' | 'csv') => {
    try {
      const result =
        format === 'excel' ? downloadTemplateExcel(state) : downloadTemplateCsv(state)
      setSnackbar({
        open: true,
        severity: 'success',
        message: `${result.fileName} téléchargé (${result.rowCount} ligne${result.rowCount > 1 ? 's' : ''}).`,
      })
    } catch (error) {
      const message =
        error instanceof TemplateExportError
          ? error.message
          : 'Une erreur est survenue lors du téléchargement.'
      setSnackbar({ open: true, severity: 'error', message })
    }
  }

  return (
    <>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Vérifiez votre configuration puis téléchargez le template de collecte.
      </Typography>

      <Paper variant="outlined" sx={{ p: 3, mb: 3, bgcolor: 'grey.50' }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }} gutterBottom>
          Résumé du projet
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <List dense disablePadding>
          {summaryItems.map((item) => (
            <ListItem key={item.label} disableGutters sx={{ py: 0.75 }}>
              <ListItemText
                primary={item.label}
                secondary={item.value}
                slotProps={{
                  primary: { variant: 'caption', color: 'text.secondary' },
                  secondary: {
                    variant: 'body1',
                    color: 'text.primary',
                    sx: {
                      fontWeight: 500,
                      fontFamily: item.label === 'Template GPS' ? 'monospace' : undefined,
                      fontSize: item.label === 'Template GPS' ? '0.8rem' : undefined,
                    },
                  },
                }}
              />
            </ListItem>
          ))}
        </List>
      </Paper>

      {isGps ? (
        <Alert severity="info" sx={{ mb: 3 }}>
          {GPS_TEMPLATE_USER_NOTE}
        </Alert>
      ) : null}

      <Paper variant="outlined" sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <ViewColumnOutlinedIcon color="primary" fontSize="small" />
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Aperçu des colonnes du fichier
          </Typography>
        </Box>
        {templatePreview ? (
          <>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Smart Template Generator — {previewTableRows.length} ligne
              {previewTableRows.length > 1 ? 's' : ''} préremplie
              {previewTableRows.length > 1 ? 's' : ''}.
            </Typography>
            <Box
              sx={{
                px: 2,
                py: 1.5,
                mb: 2,
                borderRadius: 1,
                bgcolor: 'grey.100',
                fontFamily: 'ui-monospace, Consolas, monospace',
                fontSize: '0.875rem',
                overflowX: 'auto',
              }}
            >
              {templatePreview.previewLine}
            </Box>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    {templatePreview.columns.map((col) => (
                      <TableCell key={col} sx={{ fontWeight: 600 }}>
                        {col}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {previewTableRows.map((row) => (
                    <TableRow key={row.id}>
                      {row.cells.map((cell, cellIndex) => (
                        <TableCell key={`${row.id}-${cellIndex}`}>
                          {cell === '' ? (
                            <Typography variant="caption" color="text.secondary">
                              —
                            </Typography>
                          ) : (
                            cell
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        ) : (
          <Typography variant="body2" color="text.secondary">
            Complétez l’indicateur et le niveau géographique pour afficher l’aperçu des colonnes.
          </Typography>
        )}
      </Paper>

      <Alert severity="success" sx={{ mb: 3 }}>
        Les fichiers Excel et CSV sont générés localement dans votre navigateur (aucun envoi serveur).
      </Alert>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        <Button
          variant="contained"
          size="large"
          startIcon={<TableChartOutlinedIcon />}
          onClick={() => handleDownload('excel')}
          disabled={!exportReady}
        >
          Télécharger Excel
        </Button>
        <Button
          variant="outlined"
          size="large"
          startIcon={<DescriptionOutlinedIcon />}
          onClick={() => handleDownload('csv')}
          disabled={!exportReady}
        >
          Télécharger CSV
        </Button>
      </Box>

      <TemplateImportSection state={state} disabled={!exportReady} />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  )
}
