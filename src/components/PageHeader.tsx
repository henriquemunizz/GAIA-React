interface PageHeaderProps {
  title: string
  description: string
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden bg-gaia-950 px-4 py-16 text-center text-white sm:py-20">
      <div className="absolute -left-16 top-8 h-48 w-48 rounded-full bg-gaia-400/15 blur-3xl" />
      <div className="absolute -right-12 bottom-0 h-40 w-40 rounded-full bg-sun-400/10 blur-3xl" />
      <div className="relative mx-auto max-w-4xl animate-rise">
        <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-gaia-200 ring-1 ring-white/10">
          Projeto GAIA
        </span>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-gaia-100 sm:text-base">
          {description}
        </p>
      </div>
    </section>
  )
}
