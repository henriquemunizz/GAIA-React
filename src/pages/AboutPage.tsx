import { PageHeader } from '../components/PageHeader'

const topics = [
  {
    title: 'Contexto',
    text: 'A SoulUp é uma plataforma digital voltada ao engajamento sustentável. Os usuários realizam atividades, interagem com conteúdos e acumulam pontos que podem ser trocados por benefícios.',
  },
  {
    title: 'Problema',
    text: 'Com o crescimento da plataforma, muitos usuários podem ter dificuldade para saber como evoluir, entender seu progresso e manter o engajamento dentro da SoulUp.',
  },
  {
    title: 'Solução proposta',
    text: 'A GAIA funciona como uma assistente e avatar que auxilia o usuário. Ela acompanha, incentiva e oferece pontos extras quando o usuário conclui uma missão existente.',
  },
]

const technologies = ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'API REST']

export function AboutPage() {
  return (
    <main className="flex-1">
      <PageHeader
        title="Sobre o Projeto"
        description="Conheça o contexto, o problema e a solução proposta pelo GAIA."
      />

      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
        <section className="grid gap-5 lg:grid-cols-2">
          {topics.map((topic, index) => (
            <article
              key={topic.title}
              className={`animate-rise rounded-[1.75rem] p-8 ring-1 ring-gaia-900/5 ${
                index === 0 ? 'bg-gaia-100 lg:col-span-2' : 'bg-white'
              }`}
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gaia-600">0{index + 1}</span>
              <h2 className="mt-3 text-2xl font-semibold text-gaia-950">{topic.title}</h2>
              <p className="mt-4 max-w-3xl leading-7 text-slate-600">{topic.text}</p>
            </article>
          ))}
        </section>

        <section className="mt-6 rounded-[1.75rem] bg-white p-8 ring-1 ring-gaia-900/5">
          <h2 className="text-2xl font-semibold text-gaia-950">Tecnologias utilizadas</h2>
          <p className="mt-2 text-sm text-slate-500">Ferramentas trabalhadas durante as aulas da Sprint 4.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {technologies.map((technology) => (
              <div
                key={technology}
                className="rounded-full bg-gaia-50 px-5 py-3 text-center text-sm font-semibold text-gaia-700 ring-1 ring-gaia-900/5"
              >
                {technology}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-6 grid gap-8 rounded-[1.75rem] bg-gaia-950 p-8 text-white md:grid-cols-[0.7fr_1.3fr] md:p-10">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gaia-400">Evolução</span>
            <h2 className="mt-3 text-3xl font-semibold">Roadmap</h2>
            <p className="mt-3 text-sm leading-6 text-gaia-100">Da primeira estrutura em HTML até a integração completa com o backend.</p>
          </div>
          <ol className="space-y-3 text-sm text-gaia-100">
            <li className="rounded-xl bg-white/5 px-4 py-3 ring-1 ring-white/10">Criação da estrutura inicial e identidade visual.</li>
            <li className="rounded-xl bg-white/5 px-4 py-3 ring-1 ring-white/10">Desenvolvimento das páginas obrigatórias.</li>
            <li className="rounded-xl bg-white/5 px-4 py-3 ring-1 ring-white/10">Migração para React, TypeScript e Tailwind CSS.</li>
            <li className="rounded-xl bg-white/5 px-4 py-3 ring-1 ring-white/10">Componentização e criação da navegação SPA.</li>
            <li className="rounded-xl bg-white/5 px-4 py-3 ring-1 ring-white/10">Integração com a API Java da solução.</li>
          </ol>
        </section>
      </div>
    </main>
  )
}
