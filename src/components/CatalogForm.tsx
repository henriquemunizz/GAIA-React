import { useForm } from 'react-hook-form'
import type { Mission, NewMission } from '../types/mission'
import type { Reward } from '../types/reward'

interface CatalogFormProps {
  mission: boolean
  item?: Mission | Reward
  busy: boolean
  onSave: (data: NewMission) => Promise<void>
  onCancel: () => void
}

export function CatalogForm({ mission, item, busy, onSave, onCancel }: CatalogFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<NewMission>({
    defaultValues: {
      nome: item?.nome ?? '',
      descricao: item?.descricao ?? '',
      pontos: item?.pontos ?? 10,
      ativo: item?.ativo ?? 1,
      dificuldade: item && 'dificuldade' in item ? item.dificuldade : 1,
    },
  })

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSave)} noValidate aria-label={item ? 'Editar item' : 'Cadastrar item'}>
      <fieldset disabled={busy} className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="item-name" className="text-sm font-semibold">Nome</label>
          <input id="item-name" className="field" maxLength={100} {...register('nome', { required: 'Informe o nome.', validate: (value) => Boolean(value.trim()) || 'Informe o nome.', maxLength: { value: 100, message: 'Use até 100 caracteres.' } })} />
          {errors.nome && <p className="field-error">{errors.nome.message}</p>}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="item-description" className="text-sm font-semibold">Descrição</label>
          <textarea id="item-description" className="field" rows={3} maxLength={500} {...register('descricao', { required: 'Informe a descrição.', validate: (value) => Boolean(value.trim()) || 'Informe a descrição.', maxLength: { value: 500, message: 'Use até 500 caracteres.' } })} />
          {errors.descricao && <p className="field-error">{errors.descricao.message}</p>}
        </div>
        <div>
          <label htmlFor="item-points" className="text-sm font-semibold">{mission ? 'Pontos' : 'Custo em pontos'}</label>
          <input id="item-points" className="field" type="number" min={1} max={2147483647} step={1} {...register('pontos', { valueAsNumber: true, validate: (value) => (Number.isInteger(value) && value > 0 && value <= 2147483647) || 'Use um número inteiro de 1 a 2147483647.' })} />
          {errors.pontos && <p className="field-error">{errors.pontos.message}</p>}
        </div>
        {mission && <div>
          <label htmlFor="item-difficulty" className="text-sm font-semibold">Dificuldade</label>
          <select id="item-difficulty" className="field" {...register('dificuldade', { valueAsNumber: true })}>
            <option value={1}>Fácil</option><option value={2}>Médio</option><option value={3}>Difícil</option>
          </select>
        </div>}
        <div>
          <label htmlFor="item-active" className="text-sm font-semibold">Situação</label>
          <select id="item-active" className="field" {...register('ativo', { valueAsNumber: true })}>
            <option value={1}>Ativo</option><option value={0}>Inativo</option>
          </select>
        </div>
      </fieldset>
      <p className="text-xs leading-5 text-slate-500">Itens inativos ficam ocultos para usuários comuns, mas continuam visíveis para administradores. O histórico já registrado é preservado.</p>
      <div className="flex flex-wrap gap-3">
        <button className="btn-primary" type="submit" disabled={busy}>{busy ? 'Salvando...' : item ? 'Salvar alterações' : 'Cadastrar item'}</button>
        <button className="btn-secondary" type="button" disabled={busy} onClick={onCancel}>Cancelar</button>
      </div>
    </form>
  )
}
