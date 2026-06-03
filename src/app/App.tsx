import { CssBaseline, ThemeProvider } from '@mui/material'
import { RouterProvider } from 'react-router-dom'
import { appRouter } from './router'
import { hmsTheme } from './theme'

export default function App() {
  return (
    <ThemeProvider theme={hmsTheme}>
      <CssBaseline />
      <RouterProvider router={appRouter} />
    </ThemeProvider>
  )
}
