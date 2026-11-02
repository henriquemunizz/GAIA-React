import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, Navigate, useLocation } from 'react-router-dom'
import { AccountFields } from '../components/AccountFields'
import { Feedback } from '../components/Feedback'
import { PageHeader } from '../components/PageHeader'
import { useAuth } from '../context/useAuth'
import { errorMessage } from '../services/api'
import { login, registerUser } from '../services/users'
import type { Credentials } from '../types/user'

export function LoginPage({ signingUp = false }: { signingUp?: boolean }) {
  const { user, loading, error: sessionError, setUser } = useAuth()
  const location = useLocation()
  const [registered, setRegistered] = useState(false)
  const [error, setError] = useState('')
  const busy = useRef(false)
  const { register, handleSubmit, resetField, formState: { errors, isSubmitting } } = useForm<Credentials>()
  const destination = typeof location.state?.from === 'string' && location.state.from.startsWith('/solucao/')
    ? location.state.from : '/solucao/perfil'

  async function submit(data: Credentials) {
    if (busy.current) return
    busy.current = true
    setError('')

    try {
      if (signingUp && !registered) {
        await registerUser(data)
        setRegistered(true)
        resetField('senha')
      } else {
        setUser(await login(data))
      }
    } catch (error) {
      setError(errorMessage(error))
    } finally {
      busy.current = false
    }
  }

  if (loading) return <main className="flex-1 p-12 text-center" role="status">Verificando sua sessão...</main>
  if (user) return <Navigate to={destination} replace />

  const createAccount = signingUp && !registered

  return (
    <main className="flex-1">
      <PageHeader title="Solução GAIA" description="Pequenas ações, progresso de verdade. Entre para começar sua jornada sustentável." />
      <section className="mx-auto grid max-w-5xl gap-8 px-4 py-12 md:grid-cols-2 sm:py-16">
        <div className="rounded-[1.25rem] bg-gaia-100 p-8">
          <img src="/images/gaia-robot.png" alt="Robô Gaia com olhos sorridentes" className="mb-6 h-28 w-28 object-contain" />
          <h2 className="text-3xl font-extrabold text-gaia-900">Cada ação conta.</h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">Acompanhe seu perfil, conclua missões quantas vezes realizar cada atividade e use seus pontos para resgatar recompensas.</p>
          <div className="mt-6 flex flex-wrap gap-2 text-xs font-semibold text-gaia-700">
            {['Perfil', 'Missões', 'Recompensas'].map((label) => <span key={label} className="rounded-full bg-white px-4 py-2">{label}</span>)}
          </div>
        </div>
        <form onSubmit={(event) => void handleSubmit(submit)(event)} noValidate className="card space-y-5">
          <h2 className="text-2xl font-bold">{createAccount ? 'Crie sua conta' : 'Entre na sua conta'}</h2>
          <Feedback error={error || sessionError} message={registered ? 'Conta criada! Digite sua senha para entrar.' : undefined} />
          {location.state?.from && <p className="text-sm text-slate-600">Entre para continuar. Se sua sessão expirou, faça login novamente.</p>}
          <AccountFields register={register} errors={errors} signingUp={createAccount} />
          <button type="submit" disabled={isSubmitting} className="btn-primary w-full">{isSubmitting ? 'Aguarde...' : createAccount ? 'Cadastrar' : 'Entrar'}</button>
          <p className="text-center text-sm text-slate-600">
            {createAccount ? 'Já tem conta? ' : 'Ainda não tem conta? '}
            <Link className="font-semibold text-gaia-700 underline" to={createAccount ? '/solucao' : '/solucao/cadastro'} state={location.state}>
              {createAccount ? 'Entrar' : 'Criar conta'}
            </Link>
          </p>
        </form>
      </section>
    </main>
  )
}
