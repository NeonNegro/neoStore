import { Route, Routes } from 'react-router-dom'
import Layout from '../components/Layout.jsx'
import ProtectedRoute from '../components/ProtectedRoute.jsx'
import AccountPage from '../pages/AccountPage.jsx'
import HomePage from '../pages/HomePage.jsx'
import LoginPage from '../pages/LoginPage.jsx'
import NotFoundPage from '../pages/NotFoundPage.jsx'
import ProductPage from '../pages/ProductPage.jsx'
import SignupPage from '../pages/SignupPage.jsx'

function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />} path="/">
        <Route index element={<HomePage />} />
        <Route path="produto/:id" element={<ProductPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="cadastro" element={<SignupPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="minha-conta" element={<AccountPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
