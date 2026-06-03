import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { WizardScrollablePanel } from '../../../components/common/WizardScrollablePanel'
import { WizardScrollHint } from '../../../components/common/WizardScrollHint'
import {
  getGeographySelectionOptions,
  isGpsGeographicLevel,
} from '../../../data/wizardGeography'
import type { GeographicLevel } from '../../../types/wizard'

const UID_COLUMN_BY_LEVEL: Record<Exclude<GeographicLevel, 'gps'>, string> = {
  province: 'Province_UID',
  territoire: 'Territoire_UID',
  'zone-sante': 'ZoneSante_UID',
  'aire-sante': 'AireSante_UID',
}

const NAME_COLUMN_BY_LEVEL: Record<Exclude<GeographicLevel, 'gps'>, string> = {
  province: 'Province_Name',
  territoire: 'Territoire_Name',
  'zone-sante': 'ZoneSante_Name',
  'aire-sante': 'AireSante_Name',
}

type WizardStepZoneProps = {
  geographicLevel: GeographicLevel | null
  selectedEntityIds: string[]
  onToggleEntity: (entityId: string) => void
}

export function WizardStepZone({
  geographicLevel,
  selectedEntityIds,
  onToggleEntity,
}: WizardStepZoneProps) {
  if (!geographicLevel) {
    return (
      <Typography color="text.secondary">
        Veuillez d’abord choisir un niveau géographique.
      </Typography>
    )
  }

  if (isGpsGeographicLevel(geographicLevel)) {
    return null
  }

  const adminLevel = geographicLevel as Exclude<GeographicLevel, 'gps'>
  const options = getGeographySelectionOptions(adminLevel)
  const uidLabel = UID_COLUMN_BY_LEVEL[adminLevel]
  const nameLabel = NAME_COLUMN_BY_LEVEL[adminLevel]

  const stepIntro: Record<Exclude<GeographicLevel, 'gps'>, string> = {
    province: 'Sélectionnez une ou plusieurs provinces.',
    territoire: 'Sélectionnez un ou plusieurs territoires (province parente indiquée).',
    'zone-sante':
      'Sélectionnez une ou plusieurs zones de santé. Les provinces et territoires parents seront conservés comme contexte cartographique.',
    'aire-sante':
      'Sélectionnez une ou plusieurs aires de santé avec leur zone, province et territoire parents.',
  }

  const isScrollableList = options.length > 10
  const tableMaxHeight = 480

  const tableHeadRow = (
    <TableRow>
      <TableCell padding="checkbox" sx={{ bgcolor: 'background.paper' }} />
      <TableCell sx={{ fontWeight: 600, bgcolor: 'background.paper' }}>{nameLabel}</TableCell>
      <TableCell sx={{ fontWeight: 600, bgcolor: 'background.paper' }}>{uidLabel}</TableCell>
      <TableCell sx={{ fontWeight: 600, bgcolor: 'background.paper' }}>Contexte</TableCell>
    </TableRow>
  )

  const tableBodyRows = options.map((option) => (
    <TableRow
      key={option.entityId}
      hover
      selected={selectedEntityIds.includes(option.entityId)}
    >
      <TableCell padding="checkbox">
        <Checkbox
          checked={selectedEntityIds.includes(option.entityId)}
          onChange={() => onToggleEntity(option.entityId)}
        />
      </TableCell>
      <TableCell>
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          {option.primaryLabel}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>
          {option.entityCode}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body2" color="text.secondary">
          {option.contextLabel}
        </Typography>
      </TableCell>
    </TableRow>
  ))

  return (
    <>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
        {stepIntro[adminLevel]}
      </Typography>
      <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
        Humanitarian Geography Registry — colonnes template : {nameLabel} | {uidLabel}
      </Typography>

      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        <Paper variant="outlined" sx={{ overflow: 'hidden' }}>
          {isScrollableList ? (
            <TableContainer sx={{ maxHeight: tableMaxHeight, overflow: 'auto' }}>
              <Table size="small" stickyHeader>
                <TableHead>{tableHeadRow}</TableHead>
                <TableBody>{tableBodyRows}</TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Table size="small">
              <TableHead>{tableHeadRow}</TableHead>
              <TableBody>{tableBodyRows}</TableBody>
            </Table>
          )}
        </Paper>
        <WizardScrollHint visible={isScrollableList} />
      </Box>

      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        <WizardScrollablePanel
          itemCount={options.length}
          scrollThreshold={10}
          maxHeight={tableMaxHeight}
        >
          <Paper variant="outlined" sx={{ p: 1, overflow: 'hidden' }}>
            <FormGroup>
              {options.map((option) => (
                <FormControlLabel
                  key={option.entityId}
                  control={
                    <Checkbox
                      checked={selectedEntityIds.includes(option.entityId)}
                      onChange={() => onToggleEntity(option.entityId)}
                    />
                  }
                  label={
                    <Box sx={{ minWidth: 0 }}>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {option.primaryLabel} — {option.contextLabel}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ fontFamily: 'monospace' }}
                      >
                        {uidLabel}: {option.entityCode}
                      </Typography>
                    </Box>
                  }
                />
              ))}
            </FormGroup>
          </Paper>
        </WizardScrollablePanel>
      </Box>

      {selectedEntityIds.length > 0 ? (
        <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
          {selectedEntityIds.length} entité{selectedEntityIds.length > 1 ? 's' : ''} sélectionnée
          {selectedEntityIds.length > 1 ? 's' : ''}
        </Typography>
      ) : null}
    </>
  )
}
