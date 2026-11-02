import { useEffect, useRef, useState } from 'react'
import { CatalogForm } from '../components/CatalogForm'
import { Feedback } from '../components/Feedback'
import { useAuth } from '../context/useAuth'
import { useSolution } from '../context/useSolution'
import { ApiError, errorMessage } from '../services/api'
import { createMission, deleteMission, getMissions, updateMission } from '../services/missions'
import { completeMission, redeemReward } from '../services/progress'
import { createReward, deleteReward, getRewards, updateReward } from '../services/rewards'
import type { Mission, NewMission } from '../types/mission'
import type { Reward } from '../types/reward'

export function CatalogPage({ mission = false }: { mission?: boolean }) {
  const { user } = useAuth()
  const { progress, setProgress, refreshProgress } = useSolution()
  const [items, setItems] = useState<(Mission | Reward)[]>([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [reloadCount, setReloadCount] = useState(0)
  const [editing, setEditing] = useState<Mission | Reward | 'new' | null>(null)
  const [deleting, setDeleting] = useState<Mission | Reward | null>(null)
  const [conflictId, setConflictId] = useState<number | null>(null)
  const [busy, setBusy] = useState(false)
  const locked = useRef(false)
  const admin = user?.perfil === 'ADMIN'

  useEffect(() => {
    let active = true
    const load = mission ? getMissions : getRewards
    load().then((data) => {
      if (active) setItems(data)
    }).catch((error) => {
      if (active) setLoadError(errorMessage(error))
    }).finally(() => {
      if (active) setLoading(false)
    })
    return () => { active = false }
  }, [mission, reloadCount])

  function reload() {
    setLoading(true)
    setLoadError('')
    setReloadCount((value) => value + 1)
  }

  async function perform(action: () => Promise<void>) {
    if (locked.current) return
    locked.current = true
    setBusy(true)
    setError('')
    setMessage('')
    setConflictId(null)
    try {
      await action()
    } catch (error) {
      setError(errorMessage(error))
    } finally {
      locked.current = false
      setBusy(false)
    }
  }

  function save(data: NewMission) {
    return perform(async () => {
      if (mission) {
        if (editing && editing !== 'new') await updateMission(editing.id, data)
        else await createMission(data)
      } else {
        const reward = { nome: data.nome, descricao: data.descricao, pontos: data.pontos, ativo: data.ativo }
        if (editing && editing !== 'new') await updateReward(editing.id, reward)
        else await createReward(reward)
      }
      setEditing(null)
      setMessage('Cadastro salvo com sucesso.')
      reload()
    })
  }

  function remove(item: Mission | Reward) {
    return perform(async () => {
      try {
        if (mission) await deleteMission(item.id)
        else await deleteReward(item.id)
        setMessage('Item excluído com sucesso.')
        reload()
      } catch (error) {
        if (error instanceof ApiError && error.status === 409) setConflictId(item.id)
        throw error
      } finally {
        setDeleting(null)
      }
    })
  }

  function deactivate(item: Mission | Reward) {
    return perform(async () => {
      const data = { nome: item.nome, descricao: item.descricao, pontos: item.pontos, ativo: 0 as const }
      if ('dificuldade' in item) await updateMission(item.id, { ...data, dificuldade: item.dificuldade })
      else await updateReward(item.id, data)
      setMessage('Item desativado. O histórico foi preservado.')
      reload()
    })
  }

  function act(item: Mission | Reward) {
    return perform(async () => {
      try {
        const result = mission ? await completeMission(item.id) : await redeemReward(item.id)
        setProgress(result)
        setMessage(mission ? `Missão concluída! Seu saldo agora é de ${result.saldo} pontos. Você pode realizá-la novamente.` : `Recompensa resgatada! Seu saldo agora é de ${result.saldo} pontos.`)
      } catch (error) {
        await refreshProgress()
        throw error
      }
    })
  }

  const visibleItems = admin ? items : items.filter((item) => item.ativo === 1)
  const conflict = items.find((item) => item.id === conflictId)

  return (
    <section className="space-y-5" aria-label={mission ? 'Missões' : 'Recompensas'}>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">{mission ? 'Missões' : 'Recompensas'}</h2>
          <p className="mt-2 text-sm text-slate-600">{mission ? 'Realizou a atividade? Registre cada conclusão e ganhe pontos novamente.' : 'Escolha uma recompensa e troque seus pontos por novas conquistas.'}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button className="btn-secondary" disabled={loading || busy} onClick={reload}>Atualizar lista</button>
          {admin && <button className="btn-primary" disabled={busy} onClick={() => { setEditing('new'); setDeleting(null); setError(''); setMessage('') }}>Nova {mission ? 'missão' : 'recompensa'}</button>}
        </div>
      </div>
      <Feedback error={error} message={message} />
      {admin && conflict && <div className="card space-y-3">
        <p className="text-sm">Este item tem histórico e não pode ser excluído. Você pode desativá-lo.</p>
        <button className="btn-secondary" disabled={busy || conflict.ativo === 0} onClick={() => void deactivate(conflict)}>Desativar item</button>
      </div>}
      {admin && editing && <CatalogForm key={editing === 'new' ? 'new' : editing.id} mission={mission} item={editing === 'new' ? undefined : editing} busy={busy} onSave={save} onCancel={() => setEditing(null)} />}
      {admin && deleting && <div className="card space-y-4" role="region" aria-label="Confirmar exclusão">
        <h3 className="text-lg font-bold">Excluir {deleting.nome}?</h3>
        <p className="text-sm text-slate-600">A exclusão é definitiva. Itens com histórico só podem ser desativados.</p>
        <div className="flex flex-wrap gap-3">
          <button className="btn-danger" disabled={busy} onClick={() => void remove(deleting)}>Confirmar exclusão</button>
          <button className="btn-secondary" disabled={busy} onClick={() => setDeleting(null)}>Cancelar</button>
        </div>
      </div>}
      {loading && <p className="py-10 text-center text-slate-500" role="status">Carregando {mission ? 'missões' : 'recompensas'}...</p>}
      <Feedback error={loadError} />
      {!loading && !loadError && visibleItems.length === 0 && <p className="card text-center text-slate-500">Nenhuma {mission ? 'missão' : 'recompensa'} disponível no momento.</p>}
      {!loading && !loadError && <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {visibleItems.map((item) => (
          <article key={item.id} className="card flex min-w-0 flex-col space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="rounded-full bg-gaia-100 px-3 py-1 text-xs font-bold text-gaia-700">{'dificuldade' in item ? ['Fácil', 'Médio', 'Difícil'][item.dificuldade - 1] : 'Recompensa'}</span>
              {admin && <span className="text-xs text-slate-500">{item.ativo === 1 ? 'Ativo' : 'Inativo'}</span>}
            </div>
            <h3 className="break-words text-xl font-bold">{item.nome}</h3>
            <p className="flex-1 whitespace-pre-wrap break-words text-sm leading-6 text-slate-600">{item.descricao}</p>
            <p className="font-bold text-gaia-700">{mission ? '+' : ''}{item.pontos.toLocaleString('pt-BR')} pontos</p>
            <button className="btn-primary" disabled={busy || item.ativo === 0 || (!mission && !progress)} onClick={() => void act(item)}>{busy ? 'Aguarde...' : mission ? 'Concluir missão' : 'Resgatar recompensa'}</button>
            {!mission && progress && progress.saldo < item.pontos && <p className="text-xs text-slate-500">Faltam {item.pontos - progress.saldo} pontos para este resgate.</p>}
            {admin && <div className="flex flex-wrap gap-3 border-t border-slate-100 pt-4">
              <button className="text-sm font-semibold text-gaia-700 underline disabled:opacity-50" disabled={busy} onClick={() => { setEditing(item); setDeleting(null); setError(''); setMessage('') }}>Editar</button>
              <button className="text-sm font-semibold text-red-700 underline disabled:opacity-50" disabled={busy} onClick={() => { setDeleting(item); setEditing(null); setError(''); setMessage('') }}>Excluir</button>
            </div>}
          </article>
        ))}
      </div>}
    </section>
  )
}
