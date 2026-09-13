import { useState, type FormEvent } from 'react'
import { PageHeader } from '../components/PageHeader'
import { usePoints } from '../context/usePoints'
import { missions } from '../data/missions'

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

export function AssistantPage() {
  const [missionId, setMissionId] = useState('')
  const [message, setMessage] = useState('')
  const { addPoints } = usePoints()

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const mission = missions.find((item) => item.id === Number(missionId))

    if (!mission) {
      setMessage('Selecione uma missão concluída.')
      return
    }

    addPoints(mission.points)
    setMessage(`Missão confirmada! A GAIA adicionou ${mission.points} pontos extras.`)
    setMissionId('')
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
          <div className="text-center">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gaia-600">Ganhe pontos</span>
            <h2 className="mt-3 text-3xl font-semibold text-gaia-950">Registrar conclusão de missão</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Simule o recebimento de pontos extras após completar uma missão da SoulUp.
            </p>
          </div>

          <form className="w-full rounded-2xl bg-white p-5 ring-1 ring-gaia-900/5" onSubmit={handleSubmit}>
            <label htmlFor="mission" className="text-sm font-semibold text-slate-700">
              Missão concluída
            </label>
            <select
              id="mission"
              value={missionId}
              onChange={(event) => setMissionId(event.target.value)}
              className="mt-2 w-full rounded-xl bg-gaia-50 px-4 py-3 text-sm outline-none ring-1 ring-gaia-900/5 focus:ring-2 focus:ring-gaia-400"
            >
              <option value="">Selecione uma opção</option>
              {missions.map((mission) => (
                <option key={mission.id} value={mission.id}>
                  {mission.name} (+{mission.points} pontos)
                </option>
              ))}
            </select>

            <button
              type="submit"
              className="mt-4 w-full rounded-full bg-gaia-950 px-4 py-3 font-semibold text-white transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-gaia-700 active:scale-[0.99]"
            >
              Receber pontos extras
            </button>
          </form>

          {message && (
            <p className="mt-5 rounded-xl bg-white p-4 text-center text-sm font-medium text-gaia-700 ring-1 ring-gaia-900/5 md:col-start-2" role="status">
              {message}
            </p>
          )}
        </section>
      </div>
    </main>
  )
}
