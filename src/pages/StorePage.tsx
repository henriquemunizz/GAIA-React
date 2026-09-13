import { useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { AccessoryCard } from '../components/AccessoryCard'
import { PageHeader } from '../components/PageHeader'
import { usePoints } from '../context/usePoints'
import { useAccessories } from '../hooks/useAccessories'
import { createAccessory } from '../services/accessories'

interface AccessoryFormData {
  nmRecompensa: string
  dsRecompensa: string
  tpAcessorio: string
  nrCustoPontos: number
  dsImagem: string
}

const inputClass =
  'mt-2 w-full rounded-xl bg-gaia-50 px-4 py-3 text-sm outline-none ring-1 ring-gaia-900/5 focus:ring-2 focus:ring-gaia-400'

export function StorePage() {
  const { points } = usePoints()
  const { accessories, loading, error, reload } = useAccessories()
  const [createMessage, setCreateMessage] = useState('')
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AccessoryFormData>()

  const activeAccessories = accessories.filter((accessory) => accessory.stRecompensa === 'A')

  const handleCreateAccessory: SubmitHandler<AccessoryFormData> = async (data) => {
    setCreateMessage('')

    try {
      await createAccessory({
        ...data,
        dsImagem: data.dsImagem || null,
        stRecompensa: 'A',
      })
      setCreateMessage('Recompensa cadastrada na API com sucesso!')
      reset()
      reload()
    } catch {
      setCreateMessage('Não foi possível cadastrar a recompensa. Verifique a API.')
    }
  }

  return (
    <main className="flex-1">
      <PageHeader
        title="Loja de Acessórios"
        description="Use os pontos extras para personalizar a GAIA com acessórios especiais."
      />

      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
        <div className="mb-8 flex flex-col justify-between gap-4 rounded-[1.75rem] bg-gaia-100 p-6 ring-1 ring-gaia-900/5 sm:flex-row sm:items-center">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gaia-600">Dados da API</span>
            <h2 className="mt-2 text-2xl font-semibold text-gaia-950">Escolha seu próximo acessório.</h2>
          </div>
          <p className="rounded-full bg-gaia-950 px-5 py-3 text-center text-sm font-bold text-white">
            Saldo · <span className="text-gaia-400">{points} pontos</span>
          </p>
        </div>

        {loading && <p className="py-14 text-center text-slate-500">Carregando recompensas da API...</p>}
        {error && <p className="rounded-2xl bg-red-50 p-5 text-center text-red-700" role="alert">{error}</p>}
        {!loading && !error && activeAccessories.length === 0 && <p className="py-14 text-center text-slate-500">Nenhuma recompensa ativa foi cadastrada.</p>}

        {!loading && !error && (
          <section className="grid gap-6 md:grid-cols-3">
            {activeAccessories.map((accessory) => (
              <AccessoryCard key={accessory.idRecompensa} accessory={accessory} />
            ))}
          </section>
        )}

        <details className="group mt-8 rounded-[1.75rem] bg-white p-7 ring-1 ring-gaia-900/5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-gaia-950">
            Cadastrar nova recompensa na API
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gaia-100 text-gaia-700 transition-transform group-open:rotate-45">+</span>
          </summary>

          <form className="mt-6 grid gap-4 md:grid-cols-2" onSubmit={handleSubmit(handleCreateAccessory)} noValidate>
            <div>
              <label htmlFor="accessory-name" className="text-sm font-semibold text-slate-700">Nome</label>
              <input id="accessory-name" className={inputClass} {...register('nmRecompensa', { required: 'Informe o nome.' })} />
              {errors.nmRecompensa && <p className="mt-1 text-xs text-red-600">{errors.nmRecompensa.message}</p>}
            </div>
            <div>
              <label htmlFor="accessory-type" className="text-sm font-semibold text-slate-700">Tipo de acessório</label>
              <input id="accessory-type" className={inputClass} placeholder="Ex.: ADESIVO" {...register('tpAcessorio', { required: 'Informe o tipo.' })} />
              {errors.tpAcessorio && <p className="mt-1 text-xs text-red-600">{errors.tpAcessorio.message}</p>}
            </div>
            <div className="md:col-span-2">
              <label htmlFor="accessory-description" className="text-sm font-semibold text-slate-700">Descrição</label>
              <textarea id="accessory-description" rows={3} className={inputClass} {...register('dsRecompensa', { required: 'Informe a descrição.' })} />
              {errors.dsRecompensa && <p className="mt-1 text-xs text-red-600">{errors.dsRecompensa.message}</p>}
            </div>
            <div>
              <label htmlFor="accessory-points" className="text-sm font-semibold text-slate-700">Custo em pontos</label>
              <input id="accessory-points" type="number" className={inputClass} {...register('nrCustoPontos', { valueAsNumber: true, required: 'Informe o custo.', min: { value: 1, message: 'Use pelo menos 1 ponto.' } })} />
              {errors.nrCustoPontos && <p className="mt-1 text-xs text-red-600">{errors.nrCustoPontos.message}</p>}
            </div>
            <div>
              <label htmlFor="accessory-image" className="text-sm font-semibold text-slate-700">URL da imagem (opcional)</label>
              <input id="accessory-image" type="url" className={inputClass} {...register('dsImagem')} />
            </div>
            <button type="submit" disabled={isSubmitting} className="rounded-full bg-gaia-950 px-5 py-3 font-semibold text-white hover:bg-gaia-700 disabled:opacity-50 md:col-span-2">
              {isSubmitting ? 'Cadastrando...' : 'Cadastrar recompensa'}
            </button>
            {createMessage && <p className="text-center text-sm text-gaia-700 md:col-span-2" role="status">{createMessage}</p>}
          </form>
        </details>
      </div>
    </main>
  )
}
