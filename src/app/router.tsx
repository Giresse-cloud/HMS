import { createBrowserRouter, Navigate } from 'react-router-dom'
import { MainLayout } from '../layouts/MainLayout'
import {
  DashboardPage,
  KnowledgeBasePage,
  LibraryPage,
  MarketplacePage,
  NewProjectPage,
  ProjectsPage,
  SettingsPage,
} from '../pages'

export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'nouveau-projet', element: <NewProjectPage /> },
      { path: 'mes-projets', element: <ProjectsPage /> },
      { path: 'bibliotheque', element: <LibraryPage /> },
      { path: 'knowledge-base', element: <KnowledgeBasePage /> },
      { path: 'marketplace', element: <MarketplacePage /> },
      { path: 'parametres', element: <SettingsPage /> },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
])
