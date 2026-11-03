import { useCallback, useEffect, useRef, useState } from 'react'
import { Navigate, NavLink, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import { ApiError, errorMessage } from '../services/api'
import { getProgress } from '../services/progress'
import { logout } from '../services/users'
import type { Progress } from '../types/progress'
import { Feedback } from './Feedback'
import { PageHeader } from './PageHeader'

export function RequireAuth() {
  const { user, loading, error, refreshSession } = useAuth()
  const location = useLocation()

  if (loading) return <main className="flex-1 p-12 text-center" role="status">Verificando sua sessão...</main>
  if (error) return (
    <main className="mx-auto w-full max-w-xl flex-1 space-y-4 px-4 py-12">
      <Feedback error={error} />
      <button className="btn-secondary" onClick={() => void refreshSession()}>Tentar novamente</button>
    </main>
  )
  if (!user) return <Navigate to="/solucao" state={{ from: location.pathname }} replace />

  return <SolutionLayout key={user.id} />
}

function SolutionLayout() {
  const { user, setUser } = useAuth()
  const [progress, updateProgress] = useState<Progress | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [leaving, setLeaving] = useState(false)
  const progressVersion = useRef(0)
  const logoutBusy = useRef(false)

  const setProgress = useCallback((value: Progress) => {
    progressVersion.current += 1
    updateProgress(value)
    setError('')
    setLoading(false)
  }, [])

  const refreshProgress = useCallback(() => {
    const current = ++progressVersion.current
    return getProgress().then((value) => {
      if (current === progressVersion.current) {
        updateProgress(value)
        setError('')
      }
    }).catch((error) => {
      if (current === progressVersion.current) setError(errorMessage(error))
    }).finally(() => {
      if (current === progressVersion.current) setLoading(false)
    })
  }, [])

  useEffect(() => {
    void refreshProgress()
    return () => { progressVersion.current += 1 }
  }, [refreshProgress])

  async function handleLogout() {
    if (logoutBusy.current) return
    logoutBusy.current = true
    setLeaving(true)
    try {
      await logout()
      setUser(null)
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) setUser(null)
      else setError(errorMessage(error))
    } finally {
      logoutBusy.current = false
      setLeaving(false)
    }
  }

  return (
    <main className="flex-1">
      <PageHeader title="Sua jornada com a GAIA" description="Conclua missões, acompanhe suas conquistas e transforme pontos em recompensas." />
      <div className="mx-auto max-w-6xl space-y-6 px-4 py-10 sm:py-14">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="min-w-0">
            <h2 className="break-words text-2xl font-bold">Olá, {user?.nomeUsuario}!</h2>
            <p className="mt-1 text-sm text-gaia-700">{user?.perfil === 1 ? 'Administrador' : 'Sua próxima ação faz a diferença.'}</p>
          </div>
          <button className="btn-secondary" disabled={leaving} onClick={handleLogout}>{leaving ? 'Saindo...' : 'Sair'}</button>
        </div>
        <section aria-label="Seu progresso" className="grid gap-4 sm:grid-cols-3">
          {[
            { label: 'Pontos totais ganhos', value: progress?.pontosTotais },
            { label: 'Saldo disponível', value: progress?.saldo },
            { label: 'Missões concluídas', value: progress?.missoesConcluidas },
          ].map((item, index) => (
            <div key={item.label} className={`rounded-[1.25rem] p-6 ${index === 1 ? 'bg-gaia-600 text-white' : 'bg-white ring-1 ring-gaia-900/5'}`}>
              <p className="text-sm">{item.label}</p>
              <p className="mt-2 font-heading text-3xl font-extrabold">{item.value?.toLocaleString('pt-BR') ?? '—'}</p>
            </div>
          ))}
        </section>
        {loading && <p className="text-sm text-slate-500" role="status">Carregando seu progresso...</p>}
        <Feedback error={error} />
        <div className="flex flex-wrap items-center justify-between gap-4">
          <nav className="flex flex-wrap gap-2" aria-label="Navegação da solução">
            {['Perfil', 'Missões', 'Recompensas'].map((label, index) => (
              <NavLink key={label} to={`/solucao/${['perfil', 'missoes', 'recompensas'][index]}`} className={({ isActive }) => `rounded-full px-5 py-3 text-sm font-semibold ${isActive ? 'bg-gaia-600 text-white' : 'bg-white text-gaia-700 hover:bg-gaia-100'}`}>{label}</NavLink>
            ))}
          </nav>
          <button className="text-sm font-semibold text-gaia-700 underline disabled:opacity-50" disabled={loading} onClick={() => { setLoading(true); void refreshProgress() }}>Atualizar progresso</button>
        </div>
        <Outlet context={{ progress, setProgress, refreshProgress }} />
      </div>
    </main>
  )
}
