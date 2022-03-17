import { Route, Routes } from 'react-router-dom'

import HomePage from './pages/HomePage'
import BattlesPage from './pages/BattlesPage'
import AppLayout from './layouts/AppLayout'

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<AppLayout />}>
      <Route index element={<HomePage />} />
      <Route path="battles" element={<BattlesPage />} />
    </Route>
  </Routes>
)

export default AppRoutes
