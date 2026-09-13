import { useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { PageHeader } from '../components/PageHeader'

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export function ContactPage() {
  const [sent, setSent] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>()

  const onSubmit: SubmitHandler<ContactFormData> = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    setSent(true)
    reset()
  }

  const inputClass =
    'mt-2 w-full rounded-xl bg-gaia-50 px-4 py-3 text-sm outline-none ring-1 ring-gaia-900/5 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] focus:bg-white focus:ring-2 focus:ring-gaia-400'

  return (
    <main className="flex-1">
      <PageHeader
        title="Contato"
        description="Entre em contato com a equipe responsável pelo projeto GAIA."
      />

      <div className="mx-auto grid max-w-6xl gap-5 px-4 py-16 sm:py-24 md:grid-cols-[0.8fr_1.2fr]">
        <section className="rounded-[1.75rem] bg-gaia-950 p-8 text-white">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gaia-400">Fale com o grupo</span>
          <h2 className="mt-3 text-3xl font-semibold">Informações do projeto</h2>
          <p className="mt-3 text-sm leading-6 text-gaia-100">Dúvidas, sugestões ou curiosidades sobre a proposta? Estes são os canais do projeto.</p>
          <div className="mt-10 space-y-5 text-sm text-gaia-100">
            <p><strong className="mb-1 block text-xs uppercase tracking-wider text-gaia-400">E-mail</strong> contato@gaia.com</p>
            <p>
              <strong className="mb-1 block text-xs uppercase tracking-wider text-gaia-400">GitHub</strong>
              <a
                href="https://github.com/Durannd/gaia-sprint-4"
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-white"
              >
                github.com/Durannd/gaia-sprint-4
              </a>
            </p>
            <p><strong className="mb-1 block text-xs uppercase tracking-wider text-gaia-400">Instituição</strong> FIAP</p>
            <p><strong className="mb-1 block text-xs uppercase tracking-wider text-gaia-400">Projeto</strong> Challenge SoulUp 2026</p>
          </div>
        </section>

        <form
          className="rounded-[1.75rem] bg-white p-7 ring-1 ring-gaia-900/5 sm:p-9"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <h2 className="text-2xl font-semibold text-gaia-950">Envie uma mensagem</h2>
          <p className="mt-2 text-sm text-slate-500">Preencha os campos abaixo e fale com a equipe.</p>

          <div className="mt-4">
            <label htmlFor="name" className="text-sm font-semibold text-slate-700">Nome completo</label>
            <input
              id="name"
              className={inputClass}
              {...register('name', {
                required: 'Informe seu nome.',
                minLength: { value: 3, message: 'Use pelo menos 3 caracteres.' },
              })}
            />
            {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
          </div>

          <div className="mt-4">
            <label htmlFor="email" className="text-sm font-semibold text-slate-700">E-mail</label>
            <input
              id="email"
              type="email"
              className={inputClass}
              {...register('email', {
                required: 'Informe seu e-mail.',
                pattern: { value: /\S+@\S+\.\S+/, message: 'Informe um e-mail válido.' },
              })}
            />
            {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
          </div>

          <div className="mt-4">
            <label htmlFor="subject" className="text-sm font-semibold text-slate-700">Assunto</label>
            <input
              id="subject"
              className={inputClass}
              {...register('subject', { required: 'Informe o assunto.' })}
            />
            {errors.subject && <p className="mt-1 text-xs text-red-600">{errors.subject.message}</p>}
          </div>

          <div className="mt-4">
            <label htmlFor="message" className="text-sm font-semibold text-slate-700">Mensagem</label>
            <textarea
              id="message"
              rows={4}
              className={inputClass}
              {...register('message', { required: 'Escreva uma mensagem.' })}
            />
            {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 w-full rounded-full bg-gaia-950 px-5 py-3.5 font-semibold text-white transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-gaia-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'Enviando...' : 'Enviar mensagem'}
          </button>

          {sent && (
            <p className="mt-4 rounded-xl bg-gaia-100 p-4 text-sm text-gaia-700" role="status">
              Mensagem enviada com sucesso!
            </p>
          )}
        </form>
      </div>
    </main>
  )
}
