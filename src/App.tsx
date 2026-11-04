import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { RequireAuth } from './components/SolutionLayout'
import { AuthProvider } from './context/AuthProvider'
import { AboutPage } from './pages/AboutPage'
import { CatalogPage } from './pages/CatalogPage'
import { ChatPage } from './pages/ChatPage'
import { ContactPage } from './pages/ContactPage'
import { FaqPage } from './pages/FaqPage'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { MembersPage } from './pages/MembersPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { ProfilePage } from './pages/ProfilePage'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/sobre" element={<AboutPage />} />
            <Route path="/integrantes" element={<MembersPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/contato" element={<ContactPage />} />
            <Route path="/solucao" element={<LoginPage key="login" />} />
            <Route path="/solucao/cadastro" element={<LoginPage key="register" signingUp />} />
            <Route element={<RequireAuth />}>
              <Route path="/solucao/perfil" element={<ProfilePage />} />
              <Route path="/solucao/missoes" element={<CatalogPage key="missions" mission />} />
              <Route path="/solucao/recompensas" element={<CatalogPage key="rewards" />} />
              <Route path="/solucao/chat" element={<ChatPage />} />
            </Route>
            <Route path="/assistente" element={<Navigate to="/solucao/chat" replace />} />
            <Route path="/loja" element={<Navigate to="/solucao/recompensas" replace />} />
            <Route path="/loja/:id" element={<Navigate to="/solucao/recompensas" replace />} />
            <Route path="/membros" element={<Navigate to="/integrantes" replace />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
