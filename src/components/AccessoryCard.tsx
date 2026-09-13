import { Link } from 'react-router-dom'
import type { Accessory } from '../types/accessory'

interface AccessoryCardProps {
  accessory: Accessory
}

export function AccessoryCard({ accessory }: AccessoryCardProps) {
  return (
    <article className="group flex flex-col rounded-[1.75rem] bg-white p-2 ring-1 ring-gaia-900/5 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(6,71,72,0.12)]">
      <div className="flex h-full flex-col rounded-[1.35rem] bg-gradient-to-b from-gaia-50 to-white p-5">
      <span className="flex h-36 items-center justify-center rounded-2xl bg-white text-6xl shadow-[inset_0_0_0_1px_rgba(6,71,72,0.05)] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]" aria-hidden="true">
        {accessory.icon}
      </span>
      <h2 className="mt-5 text-xl font-semibold text-gaia-950">{accessory.name}</h2>
      <p className="mt-2 flex-1 text-sm text-slate-600">{accessory.description}</p>
      <p className="mt-4 text-sm font-bold uppercase tracking-wide text-gaia-600">{accessory.price} pontos</p>
      <Link
        className="mt-4 rounded-full bg-gaia-950 px-4 py-3 text-center text-sm font-semibold text-white transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-gaia-700 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gaia-600"
        to={`/loja/${accessory.id}`}
      >
        Ver acessório
      </Link>
      </div>
    </article>
  )
}
