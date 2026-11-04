import type { HistoryEntry } from '../types/progress'

export interface NamedHistoryEntry extends HistoryEntry {
  nome: string
}

interface HistoryListProps {
  title: string
  entries: NamedHistoryEntry[]
  reward?: boolean
}

export function HistoryList({ title, entries, reward }: HistoryListProps) {
  return (
    <section className="card min-w-0">
      <h3 className="text-xl font-bold">{title}</h3>
      {entries.length === 0 ? <p className="mt-4 text-sm text-slate-500">Você ainda não tem registros aqui.</p> : (
        <ul className="mt-4 max-h-96 space-y-3 overflow-y-auto pr-2">
          {entries.map((entry) => (
            <li key={entry.id} className="rounded-xl bg-gaia-50 p-4">
              <div className="flex flex-wrap justify-between gap-2">
                <p className="break-words text-sm font-semibold">{entry.nome}</p>
                <span className="text-sm font-bold text-gaia-700">{reward ? '−' : '+'}{entry.pontos} pts</span>
              </div>
              <time dateTime={entry.data.replace(' ', 'T')} className="mt-2 block text-xs text-slate-500">{new Date(entry.data.replace(' ', 'T')).toLocaleString('pt-BR')}</time>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
