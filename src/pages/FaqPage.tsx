import { PageHeader } from '../components/PageHeader'

const questions = [
  {
    question: 'O que é a GAIA?',
    answer: 'A GAIA é uma assistente e avatar criada para auxiliar o usuário dentro da plataforma SoulUp.',
  },
  {
    question: 'A GAIA cria missões?',
    answer: 'Não. As missões já existem na SoulUp. A GAIA auxilia o usuário e acompanha sua evolução.',
  },
  {
    question: 'Como o usuário ganha pontos extras?',
    answer: 'Quando conclui uma missão ou interação existente na SoulUp, a GAIA pode conceder pontos extras como incentivo, usar sugestões de legenda criado por GAIA por exemplo, também dará pontos extras ao usuário.',
  },
  {
    question: 'Para que servem os pontos extras?',
    answer: 'Eles podem ser usados na loja para comprar acessórios e personalizar a GAIA.',
  },
  {
    question: 'Qual é o público-alvo?',
    answer: 'Usuários da SoulUp que buscam uma experiência mais guiada, interativa e personalizada.',
  },
]

export function FaqPage() {
  return (
    <main className="flex-1">
      <PageHeader
        title="Perguntas Frequentes"
        description="Confira as principais dúvidas sobre o projeto GAIA."
      />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:py-24 lg:grid-cols-[0.65fr_1.35fr]">
        <aside className="lg:sticky lg:top-6 lg:self-start">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-gaia-600">Precisa de ajuda?</span>
          <h2 className="mt-3 text-3xl font-semibold text-gaia-950">Respostas rápidas sobre a GAIA.</h2>
          <p className="mt-4 text-sm leading-6 text-slate-600">Clique em uma pergunta para abrir a resposta.</p>
        </aside>
        <section className="space-y-3">
          {questions.map((item, index) => (
            <details key={item.question} className="group rounded-2xl bg-white p-5 ring-1 ring-gaia-900/5 open:shadow-[0_16px_40px_rgba(6,71,72,0.08)]">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-semibold text-gaia-950">
                <span><span className="mr-3 text-xs text-gaia-500">0{index + 1}</span>{item.question}</span>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gaia-50 text-gaia-700 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-open:rotate-45">+</span>
              </summary>
              <p className="ml-8 mt-4 max-w-2xl text-sm leading-6 text-slate-600">{item.answer}</p>
            </details>
          ))}
        </section>
      </div>
    </main>
  )
}

