import { Link } from 'react-router-dom'
import { Feedback } from '../components/Feedback'
import { MessageList } from '../components/MessageList'
import { useChat } from '../hooks/useChat'

export function ChatPage() {
  const {
    conversations, selected, messages, text, setText, error, loading, busy, sending,
    openConversation, startConversation, refresh, submit,
  } = useChat()
  const title = conversations.find((item) => item.id === selected)?.titulo
  const avatar = '/images/gaia-login.png'

  return (
    <section aria-label="Chat com a Gaia" className="overflow-hidden rounded-3xl border border-gaia-100 bg-white shadow-sm lg:grid lg:grid-cols-[15rem_minmax(0,1fr)]">
      <aside className="min-w-0 border-b border-gaia-100 bg-gaia-50/60 p-4 lg:border-r lg:border-b-0">
        <div className="flex items-center justify-between gap-2">
          <h2 className="font-bold text-gaia-950">Conversas</h2>
          <button className="btn-secondary px-3 py-2" disabled={busy || loading} onClick={() => void startConversation()}>+ Nova</button>
        </div>
        <div className="mt-3 flex gap-2 overflow-auto lg:max-h-[32rem] lg:flex-col">
          {conversations.map((conversation) => (
            <button key={conversation.id} aria-pressed={selected === conversation.id} disabled={busy || loading}
              onClick={() => void openConversation(conversation.id)}
              className={`w-44 shrink-0 rounded-xl px-3 py-2 text-left lg:w-full ${selected === conversation.id ? 'bg-gaia-100 font-semibold text-gaia-900' : 'text-slate-600 hover:bg-white'}`}>
              <span className="block truncate text-sm">{conversation.titulo}</span>
              <span className="text-xs font-normal">{new Date(conversation.data).toLocaleDateString('pt-BR')}</span>
            </button>
          ))}
        </div>
      </aside>
      <div className="flex min-w-0 flex-col">
        <header className="flex items-center gap-3 border-b border-gaia-100 px-4 py-3">
          <img src={avatar} alt="" className="size-11 rounded-full bg-gaia-100 object-contain" />
          <div className="min-w-0 flex-1">
            <h2 className="font-heading text-lg font-bold text-gaia-950">Gaia</h2>
            <p className="truncate text-xs text-slate-600">{title || 'Assistente da sua jornada'}</p>
          </div>
          <button className="text-sm font-semibold text-gaia-700" disabled={busy || loading} onClick={() => void refresh()}>Atualizar</button>
        </header>
        <Feedback error={error} />
        <MessageList messages={messages} sending={sending} loading={loading} avatar={avatar} />
        <form onSubmit={(event) => void submit(event)} className="border-t border-gaia-100 p-3 sm:px-5">
          <div className="flex items-end gap-2 rounded-2xl border border-gaia-200 bg-white p-1.5 focus-within:ring-2 focus-within:ring-gaia-400">
            <label htmlFor="chat-message" className="sr-only">Sua mensagem</label>
            <textarea id="chat-message" rows={1} className="max-h-32 min-w-0 flex-1 resize-none px-2 py-2 text-sm outline-none [field-sizing:content]" value={sending ? '' : text} maxLength={2000} disabled={busy || loading}
              onChange={(event) => setText(event.target.value)} onKeyDown={(event) => {
                if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) {
                  event.preventDefault()
                  event.currentTarget.form?.requestSubmit()
                }
              }} placeholder="Escreva para a Gaia…" aria-describedby="chat-help" />
            <button type="submit" aria-label="Enviar mensagem" className="btn-primary grid size-9 shrink-0 place-items-center p-0" disabled={busy || loading || !text.trim()}>
              <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 7-7 7 7M12 5v14" /></svg>
            </button>
          </div>
          <details id="chat-help" className="mt-2 text-xs leading-5 text-slate-600">
            <summary className="w-fit cursor-pointer">Sobre o chat</summary>
            <p>Suas mensagens e dados da jornada são enviados à IA e ficam salvos na sua conta. Não inclua senhas. Confira os dados em <Link to="/solucao/missoes" className="underline">Missões</Link> e <Link to="/solucao/recompensas" className="underline">Recompensas</Link>.</p>
          </details>
        </form>
      </div>
    </section>
  )
}
