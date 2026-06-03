import { Box, Card, CardActionArea, CardContent, Radio, Typography } from '@mui/material'

type WizardOptionCardProps = {
  label: string
  description?: string
  selected: boolean
  onSelect: () => void
}

export function WizardOptionCard({ label, description, selected, onSelect }: WizardOptionCardProps) {
  return (
    <Card
      variant="outlined"
      sx={{
        borderColor: selected ? 'primary.main' : 'divider',
        borderWidth: selected ? 2 : 1,
        bgcolor: selected ? 'rgba(27, 54, 93, 0.04)' : 'background.paper',
      }}
    >
      <CardActionArea onClick={onSelect}>
        <CardContent sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, py: 2 }}>
          <Radio checked={selected} size="small" sx={{ p: 0, mt: 0.25 }} tabIndex={-1} />
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              {label}
            </Typography>
            {description ? (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                {description}
              </Typography>
            ) : null}
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
