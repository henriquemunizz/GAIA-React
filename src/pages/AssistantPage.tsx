import { useState, type FormEvent } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { PageHeader } from '../components/PageHeader'
import { usePoints } from '../context/usePoints'
import { useMissions } from '../hooks/useMissions'
import { createMission } from '../services/missions'

interface MissionFormData {
  nmMissao: string
  dsMissao: string
  tpDificuldade: number
  nrPontosRecompensa: number
  dsImagem: string
}

const benefits = [
  {
    title: 'Auxílio ao usuário',
    description: 'A GAIA responde dúvidas simples e ajuda o usuário a entender melhor a plataforma.',
    label: 'Assistência',
  },
  {
    title: 'Pontos extras',
    description: 'Ao concluir uma missão ou realizar interações na SoulUp, o usuário pode ganhar pontos extras.',
    label: 'Bônus',
  },
  {
    title: 'Personalização',
    description: 'Os pontos podem ser usados para comprar acessórios e personalizar a GAIA.',
    label: 'Loja',
  },
]

const inputClass =
  'mt-2 w-full rounded-xl bg-gaia-50 px-4 py-3 text-sm outline-none ring-1 ring-gaia-900/5 focus:ring-2 focus:ring-gaia-400'

export function AssistantPage() {
  const [missionId, setMissionId] = useState('')
  const [message, setMessage] = useState('')
  const [createMessage, setCreateMessage] = useState('')
  const { addPoints } = usePoints()
  const { missions, loading, error, reload } = useMissions()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<MissionFormData>()

  const activeMissions = missions.filter((mission) => mission.stMissao === 'A')

  function handleCompleteMission(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const mission = missions.find((item) => item.idMissao === Number(missionId))

    if (!mission) {
      setMessage('Selecione uma missão concluída.')
      return
    }

    addPoints(mission.nrPontosRecompensa)
    setMessage(`Missão confirmada! A GAIA adicionou ${mission.nrPontosRecompensa} pontos extras.`)
    setMissionId('')
  }

  const handleCreateMission: SubmitHandler<MissionFormData> = async (data) => {
    setCreateMessage('')

    try {
      await createMission({
        ...data,
        dsImagem: data.dsImagem || null,
        stMissao: 'A',
      })
      setCreateMessage('Missão cadastrada na API com sucesso!')
      reset()
      reload()
    } catch {
      setCreateMessage('Não foi possível cadastrar a missão. Verifique a API.')
    }
  }

  return (
    <main className="flex-1">
      <PageHeader
        title="Assistente GAIA"
        description="A GAIA auxilia o usuário na SoulUp e oferece pontos extras após missões concluídas."
      />

      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
        <section className="grid gap-5 md:grid-cols-12">
          {benefits.map((benefit, index) => (
            <article
              key={benefit.title}
              className={`rounded-[1.75rem] p-7 ring-1 ring-gaia-900/5 ${index === 0
                  ? 'bg-gaia-950 text-white md:col-span-6'
                  : 'bg-white text-gaia-950 md:col-span-3'
                }`}
            >
              <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${index === 0 ? 'text-gaia-400' : 'text-gaia-600'}`}>{benefit.label}</span>
              <h2 className="mt-8 text-xl font-semibold">{benefit.title}</h2>
              <p className={`mt-3 text-sm leading-6 ${index === 0 ? 'text-gaia-100' : 'text-slate-600'}`}>{benefit.description}</p>
            </article>
          ))}
        </section>

        <section className="mt-6 grid gap-8 rounded-[1.75rem] bg-gaia-100 p-7 ring-1 ring-gaia-900/5 md:grid-cols-[0.8fr_1.2fr] md:p-10">
          <div className="text-center md:text-left">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gaia-600">Dados da API</span>
            <h2 className="mt-3 text-3xl font-semibold text-gaia-950">Registrar conclusão de missão</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">Escolha uma missão carregada do backend e receba os pontos correspondentes.</p>
          </div>

          <form className="w-full rounded-2xl bg-white p-5 ring-1 ring-gaia-900/5" onSubmit={handleCompleteMission}>
            <label htmlFor="mission" className="text-sm font-semibold text-slate-700">Missão concluída</label>
            <select
              id="mission"
              value={missionId}
              onChange={(event) => setMissionId(event.target.value)}
              disabled={loading || Boolean(error)}
              className={inputClass}
            >
              <option value="">{loading ? 'Carregando missões...' : 'Selecione uma opção'}</option>
              {activeMissions.map((mission) => (
                <option key={mission.idMissao} value={mission.idMissao}>
                  {mission.nmMissao} (+{mission.nrPontosRecompensa} pontos)
                </option>
              ))}
            </select>
            {error && <p className="mt-3 text-sm text-red-700" role="alert">{error}</p>}
            {!loading && !error && activeMissions.length === 0 && <p className="mt-3 text-sm text-slate-500">Nenhuma missão ativa foi cadastrada.</p>}

            <button type="submit" disabled={loading || Boolean(error)} className="mt-4 w-full rounded-full bg-gaia-950 px-4 py-3 font-semibold text-white transition-colors hover:bg-gaia-700 disabled:cursor-not-allowed disabled:opacity-50">
              Receber pontos extras
            </button>
            {message && <p className="mt-4 rounded-xl bg-gaia-100 p-4 text-center text-sm font-medium text-gaia-700" role="status">{message}</p>}
          </form>
        </section>

        <details className="group mt-6 rounded-[1.75rem] bg-white p-7 ring-1 ring-gaia-900/5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-gaia-950">
            Cadastrar nova missão na API
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gaia-100 text-gaia-700 transition-transform group-open:rotate-45">+</span>
          </summary>

          <form className="mt-6 grid gap-4 md:grid-cols-2" onSubmit={handleSubmit(handleCreateMission)} noValidate>
            <div>
              <label htmlFor="mission-name" className="text-sm font-semibold text-slate-700">Nome</label>
              <input id="mission-name" className={inputClass} {...register('nmMissao', { required: 'Informe o nome.' })} />
              {errors.nmMissao && <p className="mt-1 text-xs text-red-600">{errors.nmMissao.message}</p>}
            </div>
            <div>
              <label htmlFor="mission-difficulty" className="text-sm font-semibold text-slate-700">Dificuldade</label>
              <select id="mission-difficulty" className={inputClass} {...register('tpDificuldade', { valueAsNumber: true, required: true })}>
                <option value="1">Fácil</option>
                <option value="2">Média</option>
                <option value="3">Difícil</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label htmlFor="mission-description" className="text-sm font-semibold text-slate-700">Descrição</label>
              <textarea id="mission-description" rows={3} className={inputClass} {...register('dsMissao', { required: 'Informe a descrição.' })} />
              {errors.dsMissao && <p className="mt-1 text-xs text-red-600">{errors.dsMissao.message}</p>}
            </div>
            <div>
              <label htmlFor="mission-points" className="text-sm font-semibold text-slate-700">Pontos</label>
              <input id="mission-points" type="number" className={inputClass} {...register('nrPontosRecompensa', { valueAsNumber: true, required: 'Informe os pontos.', min: { value: 1, message: 'Use pelo menos 1 ponto.' } })} />
              {errors.nrPontosRecompensa && <p className="mt-1 text-xs text-red-600">{errors.nrPontosRecompensa.message}</p>}
            </div>
            <div>
              <label htmlFor="mission-image" className="text-sm font-semibold text-slate-700">URL da imagem (opcional)</label>
              <input id="mission-image" type="url" className={inputClass} {...register('dsImagem')} />
            </div>
            <button type="submit" disabled={isSubmitting} className="rounded-full bg-gaia-950 px-5 py-3 font-semibold text-white hover:bg-gaia-700 disabled:opacity-50 md:col-span-2">
              {isSubmitting ? 'Cadastrando...' : 'Cadastrar missão'}
            </button>
            {createMessage && <p className="text-center text-sm text-gaia-700 md:col-span-2" role="status">{createMessage}</p>}
          </form>
        </details>
      </div>
    </main>
  )
}
