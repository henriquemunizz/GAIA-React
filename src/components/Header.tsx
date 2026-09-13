import { NavLink } from 'react-router-dom'
import { usePoints } from '../context/usePoints'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/sobre', label: 'Sobre' },
  { to: '/integrantes', label: 'Integrantes' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contato', label: 'Contato' },
  { to: '/assistente', label: 'Assistente' },
  { to: '/loja', label: 'Loja' },
]

export function Header() {
  const { points } = usePoints()

  return (
    <header className="bg-gaia-950 px-3 py-3 text-white sm:px-5 sm:py-4">
      <nav
        className="mx-auto flex max-w-7xl flex-col items-center gap-4 rounded-2xl bg-white/[0.07] px-4 py-4 ring-1 ring-white/10 lg:flex-row lg:justify-between lg:px-6"
        aria-label="Navegação principal"
      >
        <NavLink to="/" className="group flex items-center gap-3">
          <img
            src="/images/gaia-logo.png"
            alt="Logo GAIA"
            className="h-10 w-10 rounded-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-6 group-hover:scale-105"
          />
          <span>
            <strong className="block text-xl tracking-[0.18em]">GAIA</strong>
          </span>
        </NavLink>

        <div className="flex max-w-full items-center gap-1 overflow-x-auto pb-1 lg:overflow-visible lg:pb-0">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `shrink-0 rounded-full px-3 py-2 text-xs font-medium transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isActive
                    ? 'bg-white text-gaia-950 shadow-sm'
                    : 'text-gaia-100 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          <span className="ml-1 shrink-0 rounded-full bg-gaia-400 px-3 py-2 text-xs font-bold text-gaia-950 shadow-[0_8px_24px_rgba(83,211,204,0.2)]">
            {points} pts
          </span>
        </div>
      </nav>
    </header>
  )
}
