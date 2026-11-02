import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { AccountFields } from '../components/AccountFields'
import { Feedback } from '../components/Feedback'
import { HistoryList, type NamedHistoryEntry } from '../components/HistoryList'
import { useAuth } from '../context/useAuth'
import { errorMessage } from '../services/api'
import { getMissions } from '../services/missions'
import { getMissionHistory, getRewardHistory } from '../services/progress'
import { getRewards } from '../services/rewards'
import { deleteCurrentUser, updateCurrentUser } from '../services/users'
import type { Credentials } from '../types/user'

export function ProfilePage() {
  const { user, setUser } = useAuth()
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [historyError, setHistoryError] = useState('')
  const [loadingHistory, setLoadingHistory] = useState(true)
  const [reloadCount, setReloadCount] = useState(0)
  const [missions, setMissions] = useState<NamedHistoryEntry[]>([])
  const [rewards, setRewards] = useState<NamedHistoryEntry[]>([])
  const [confirming, setConfirming] = useState(false)
  const [confirmation, setConfirmation] = useState('')
  const [deleting, setDeleting] = useState(false)
  const locked = useRef(false)
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<Credentials>({
    defaultValues: { nomeUsuario: user?.nomeUsuario ?? '', senha: '' },
  })

  useEffect(() => {
    let active = true
    Promise.all([getMissionHistory(), getRewardHistory(), getMissions(), getRewards()])
      .then(([missionHistory, rewardHistory, missionList, rewardList]) => {
        if (!active) return
        setMissions(missionHistory.map((entry) => ({ ...entry, nome: missionList.find((item) => item.id === entry.itemId)?.nome ?? `Missão #${entry.itemId}` })))
        setRewards(rewardHistory.map((entry) => ({ ...entry, nome: rewardList.find((item) => item.id === entry.itemId)?.nome ?? `Recompensa #${entry.itemId}` })))
      })
      .catch((error) => { if (active) setHistoryError(errorMessage(error)) })
      .finally(() => { if (active) setLoadingHistory(false) })
    return () => { active = false }
  }, [reloadCount])

  async function save(data: Credentials) {
    if (locked.current) return
    locked.current = true
    setError('')
    setMessage('')
    try {
      const updated = await updateCurrentUser({ nomeUsuario: data.nomeUsuario, ...(data.senha ? { senha: data.senha } : {}) })
      setUser(updated)
      reset({ nomeUsuario: updated.nomeUsuario, senha: '' })
      setMessage('Perfil atualizado com sucesso.')
    } catch (error) {
      setError(errorMessage(error))
    } finally {
      locked.current = false
    }
  }

  async function remove() {
    if (locked.current || confirmation !== user?.nomeUsuario) return
    locked.current = true
    setDeleting(true)
    setError('')
    setMessage('')
    try {
      await deleteCurrentUser()
      setUser(null)
    } catch (error) {
      setError(errorMessage(error))
    } finally {
      locked.current = false
      setDeleting(false)
    }
  }

  return (
    <section className="space-y-6" aria-label="Perfil">
      <Feedback error={error} message={message} />
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <form className="card space-y-5" onSubmit={(event) => void handleSubmit(save)(event)} noValidate>
          <div>
            <h2 className="text-2xl font-bold">Meu perfil</h2>
            <p className="mt-2 text-sm text-slate-500">Conta #{user?.id} · {user?.perfil === 'ADMIN' ? 'Administrador' : 'Usuário'}</p>
          </div>
          <fieldset disabled={isSubmitting || deleting} className="space-y-5">
            <AccountFields register={register} errors={errors} editing />
          </fieldset>
          <button className="btn-primary" type="submit" disabled={isSubmitting || deleting}>{isSubmitting ? 'Salvando...' : 'Salvar perfil'}</button>
        </form>
        <aside className="rounded-[1.25rem] bg-gaia-100 p-7">
          <img src="/images/gaia-robot.png" alt="" className="h-24 w-24 object-contain" />
          <h2 className="mt-5 text-2xl font-bold text-gaia-900">Sua evolução fica aqui.</h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">Os pontos totais somam todas as suas conquistas. O saldo é o que você ainda pode usar em recompensas. Cada conclusão de missão conta, inclusive quando você repete a atividade.</p>
          <p className="mt-4 text-sm leading-7 text-slate-600">O histórico guarda os pontos de cada ação, mesmo que a missão ou recompensa seja editada depois.</p>
        </aside>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl font-bold">Minha atividade</h2>
        <button className="btn-secondary" disabled={loadingHistory} onClick={() => { setLoadingHistory(true); setHistoryError(''); setReloadCount((value) => value + 1) }}>Atualizar histórico</button>
      </div>
      {loadingHistory && <p className="text-sm text-slate-500" role="status">Carregando histórico...</p>}
      <Feedback error={historyError} />
      {!loadingHistory && !historyError && <div className="grid gap-6 md:grid-cols-2">
        <HistoryList title="Missões concluídas" entries={missions} />
        <HistoryList title="Recompensas resgatadas" entries={rewards} reward />
      </div>}
      <section className="card space-y-4 border border-red-100">
        <h2 className="text-xl font-bold">Excluir minha conta</h2>
        <p className="text-sm leading-6 text-slate-600">Esta ação é definitiva e apaga seu perfil, progresso e históricos de missões e recompensas.</p>
        {!confirming ? <button className="btn-danger" disabled={isSubmitting} onClick={() => setConfirming(true)}>Excluir minha conta</button> : (
          <div className="space-y-4">
            <label htmlFor="delete-confirmation" className="block break-words text-sm font-semibold">Digite {user?.nomeUsuario} para confirmar.</label>
            <input id="delete-confirmation" className="field max-w-md" autoComplete="off" value={confirmation} disabled={deleting} onChange={(event) => setConfirmation(event.target.value)} />
            <div className="flex flex-wrap gap-3">
              <button className="btn-danger" disabled={deleting || isSubmitting || confirmation !== user?.nomeUsuario} onClick={() => void remove()}>{deleting ? 'Excluindo...' : 'Confirmar exclusão da conta'}</button>
              <button className="btn-secondary" disabled={deleting} onClick={() => { setConfirming(false); setConfirmation('') }}>Cancelar</button>
            </div>
          </div>
        )}
      </section>
    </section>
  )
}
