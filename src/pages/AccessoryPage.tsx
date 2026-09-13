import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { usePoints } from '../context/usePoints'
import { accessories } from '../data/accessories'
import type { Accessory } from '../types/accessory'

export function AccessoryPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { points, spendPoints } = usePoints()
  const [message, setMessage] = useState('')
  const accessory = accessories.find((item) => item.id === Number(id))

  if (!accessory) {
    return (
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center px-4 py-24 text-center">
        <span className="text-6xl">?</span>
        <h1 className="mt-5 text-3xl font-semibold text-gaia-950">Acessório não encontrado</h1>
        <button className="mt-6 rounded-full bg-gaia-950 px-5 py-3 text-sm font-semibold text-white hover:bg-gaia-700" onClick={() => navigate('/loja')}>
          Voltar para a loja
        </button>
      </main>
    )
  }

  function handlePurchase(item: Accessory) {
    const purchased = spendPoints(item.price)
    setMessage(
      purchased
        ? `${item.name} comprado com sucesso!`
        : `Você precisa de mais ${item.price - points} pontos para comprar este item.`,
    )
  }

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-16 sm:py-24">
      <button className="mb-6 rounded-full bg-white px-4 py-2 text-sm font-semibold text-gaia-700 ring-1 ring-gaia-900/5 transition-colors hover:bg-gaia-50" onClick={() => navigate(-1)}>
        ← Voltar
      </button>

      <article className="grid gap-2 rounded-[2rem] bg-white p-2 ring-1 ring-gaia-900/5 sm:grid-cols-2">
        <div className="flex min-h-80 items-center justify-center rounded-[1.6rem] bg-gradient-to-br from-gaia-100 to-gaia-50 text-8xl" aria-hidden="true">
          {accessory.icon}
        </div>

        <div className="flex flex-col justify-center p-6 sm:p-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gaia-600">Acessório GAIA</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-gaia-950">{accessory.name}</h1>
          <p className="mt-4 leading-7 text-slate-600">{accessory.description}</p>
          <p className="mt-6 text-xl font-semibold text-gaia-600">{accessory.price} pontos</p>
          <p className="mt-1 text-sm text-slate-500">Seu saldo: {points} pontos</p>

          <button
            className="mt-6 rounded-full bg-gaia-950 px-4 py-3.5 font-semibold text-white transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-gaia-700 active:scale-[0.99]"
            onClick={() => handlePurchase(accessory)}
          >
            Comprar acessório
          </button>

          {message && (
            <p className="mt-4 rounded-xl bg-gaia-100 p-4 text-sm text-gaia-700" role="status">
              {message}
            </p>
          )}
        </div>
      </article>
    </main>
  )
}
