import { AccessoryCard } from '../components/AccessoryCard'
import { PageHeader } from '../components/PageHeader'
import { usePoints } from '../context/usePoints'
import { accessories } from '../data/accessories'

export function StorePage() {
  const { points } = usePoints()

  return (
    <main className="flex-1">
      <PageHeader
        title="Loja de Acessórios"
        description="Use os pontos extras para personalizar a GAIA com acessórios especiais."
      />

      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
        <div className="mb-8 flex flex-col justify-between gap-4 rounded-[1.75rem] bg-gaia-100 p-6 ring-1 ring-gaia-900/5 sm:flex-row sm:items-center">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gaia-600">Personalize a GAIA</span>
            <h2 className="mt-2 text-2xl font-semibold text-gaia-950">Escolha seu próximo acessório.</h2>
          </div>
          <p className="rounded-full bg-gaia-950 px-5 py-3 text-center text-sm font-bold text-white">
            Saldo · <span className="text-gaia-400">{points} pontos</span>
          </p>
        </div>
        <section className="grid gap-6 md:grid-cols-3">
          {accessories.map((accessory) => (
            <AccessoryCard key={accessory.id} accessory={accessory} />
          ))}
        </section>
      </div>
    </main>
  )
}
