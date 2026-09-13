import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { PointsProvider } from './context/PointsProvider'
import { AboutPage } from './pages/AboutPage'
import { AccessoryPage } from './pages/AccessoryPage'
import { AssistantPage } from './pages/AssistantPage'
import { ContactPage } from './pages/ContactPage'
import { FaqPage } from './pages/FaqPage'
import { HomePage } from './pages/HomePage'
import { MembersPage } from './pages/MembersPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { StorePage } from './pages/StorePage'

function App() {
  return (
    <BrowserRouter>
      <PointsProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/sobre" element={<AboutPage />} />
            <Route path="/integrantes" element={<MembersPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/contato" element={<ContactPage />} />
            <Route path="/assistente" element={<AssistantPage />} />
            <Route path="/loja" element={<StorePage />} />
            <Route path="/loja/:id" element={<AccessoryPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </PointsProvider>
    </BrowserRouter>
  )
}

export default App
