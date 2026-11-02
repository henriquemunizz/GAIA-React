import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/sobre', label: 'Sobre' },
  { to: '/integrantes', label: 'Integrantes' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contato', label: 'Contato' },
  { to: '/solucao', label: 'Solução' },
]

export function Header() {
  const { user } = useAuth()

  return (
    <header className="border-b border-slate-200/70 border-t-4 border-t-gaia-600 bg-white px-3 py-3 text-slate-900 sm:px-5 sm:py-4">
      <nav
        className="mx-auto flex max-w-7xl flex-col items-center gap-4 rounded-2xl px-4 py-4 lg:flex-row lg:justify-between lg:px-6"
        aria-label="Navegação principal"
      >
        <NavLink to="/" className="group flex items-center gap-3">
          <img
            src="/images/gaia-robot.png"
            alt="Robô Gaia com olhos sorridentes"
            className="h-10 w-10 object-contain transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-6 group-hover:scale-105"
          />
          <span>
            <strong className="block font-heading text-xl font-extrabold tracking-tight text-gaia-600">GAIA</strong>
          </span>
        </NavLink>

        <div className="flex max-w-full items-center gap-1 overflow-x-auto pb-1 lg:overflow-visible lg:pb-0">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `shrink-0 rounded-full px-3 py-2 text-xs font-medium transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isActive
                    ? 'bg-gaia-50 text-gaia-700'
                    : 'text-slate-500 hover:bg-gaia-50 hover:text-gaia-700'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          {user && <NavLink to="/solucao/perfil" className="ml-1 max-w-32 shrink-0 truncate rounded-full bg-gaia-50 px-3 py-2 text-xs font-bold text-gaia-700">{user.nomeUsuario}</NavLink>}
        </div>
      </nav>
    </header>
  )
}
