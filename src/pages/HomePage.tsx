import { Link } from 'react-router-dom'

const features = [
  { number: '01', title: 'Sobre o projeto', description: 'Conheça o problema, a solução proposta e a jornada construída pelo grupo.', to: '/sobre' },
  { number: '02', title: 'Assistente', description: 'Conclua missões sustentáveis e receba pontos extras com a GAIA.', to: '/assistente' },
  { number: '03', title: 'Loja', description: 'Transforme seu progresso em acessórios para personalizar o avatar.', to: '/loja' },
  { number: '04', title: 'Nossa equipe', description: 'Conheça os estudantes responsáveis pela criação da experiência.', to: '/integrantes' },
]

export function HomePage() {
  return (
    <main className="flex-1">
      <section className="relative overflow-hidden bg-gaia-950 px-4 pb-20 pt-12 text-white sm:pb-28 sm:pt-16">
        <div className="absolute left-[12%] top-10 h-56 w-56 rounded-full bg-gaia-400/15 blur-3xl" />
        <div className="absolute bottom-0 right-[8%] h-64 w-64 rounded-full bg-sun-400/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="animate-rise">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-gaia-200 ring-1 ring-white/10">
              <span className="h-1.5 w-1.5 rounded-full bg-gaia-400" />
              Sua jornada sustentável
            </span>
            <h1 className="mt-6 max-w-3xl text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Pequenas ações.
              <span className="block text-gaia-400">Grandes mudanças.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-gaia-100 sm:text-lg">
              A GAIA acompanha sua experiência na SoulUp, celebra cada missão concluída e transforma
              seu progresso em uma jornada mais pessoal.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/assistente"
                className="group flex items-center gap-3 rounded-full bg-gaia-400 py-2 pl-6 pr-2 text-sm font-bold text-gaia-950 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-gaia-200 active:scale-[0.98]"
              >
                Começar jornada
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gaia-950 text-white transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5">→</span>
              </Link>
              <Link
                to="/sobre"
                className="rounded-full bg-white/5 px-6 py-4 text-sm font-semibold text-white ring-1 ring-white/15 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-white/10 active:scale-[0.98]"
              >
                Conhecer o projeto
              </Link>
            </div>
          </div>

          <div className="animate-rise delay-1 rounded-[2rem] bg-white/5 p-2 ring-1 ring-white/10">
            <div className="relative min-h-[410px] overflow-hidden rounded-[1.6rem] bg-gradient-to-br from-gaia-700 via-gaia-800 to-gaia-950 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]">
              <div className="flex items-center justify-between text-xs text-gaia-100">
                <span className="rounded-full bg-white/10 px-3 py-1.5">Painel GAIA</span>
                <span>● online</span>
              </div>
              <div className="mt-10 flex justify-center">
                <div className="flex h-40 w-40 items-center justify-center rounded-full bg-gaia-400/10 ring-1 ring-gaia-200/30">
                  <img
                    src="/images/gaia-logo.png"
                    alt="Logo circular da GAIA"
                    className="h-28 w-28 rounded-full object-cover shadow-[0_0_60px_rgba(83,211,204,0.3)]"
                  />
                </div>
              </div>
              <div className="absolute bottom-6 left-6 right-6 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/10">
                  <p className="text-[10px] uppercase tracking-widest text-gaia-200">Missões</p>
                  <p className="mt-1 text-2xl font-semibold">3 níveis</p>
                </div>
                <div className="rounded-2xl bg-sun-300 p-4 text-gaia-950">
                  <p className="text-[10px] uppercase tracking-widest opacity-70">Recompensas</p>
                  <p className="mt-1 text-2xl font-semibold">+ pontos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:py-28">
        <div className="animate-rise delay-1 max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-gaia-600">Explore a solução</span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-gaia-950 sm:text-4xl">Tudo o que você precisa para avançar com propósito.</h2>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-12">
          {features.map((feature, index) => (
            <Link
              key={feature.to}
              to={feature.to}
              className={`group rounded-[1.75rem] p-7 ring-1 ring-gaia-900/5 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(6,71,72,0.1)] ${
                index === 0
                  ? 'bg-gaia-950 text-white lg:col-span-7'
                  : index === 1
                    ? 'bg-gaia-100 text-gaia-950 lg:col-span-5'
                    : 'bg-white text-gaia-950 lg:col-span-6'
              }`}
            >
              <div className="flex items-start justify-between gap-6">
                <span className={`text-xs font-bold ${index === 0 ? 'text-gaia-400' : 'text-gaia-600'}`}>{feature.number}</span>
                <span className={`flex h-9 w-9 items-center justify-center rounded-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 ${index === 0 ? 'bg-white/10' : 'bg-gaia-50'}`}>→</span>
              </div>
              <h3 className="mt-12 text-2xl font-semibold">{feature.title}</h3>
              <p className={`mt-3 max-w-md text-sm leading-6 ${index === 0 ? 'text-gaia-100' : 'text-slate-600'}`}>{feature.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
