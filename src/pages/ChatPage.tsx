import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Feedback } from '../components/Feedback'
import { errorMessage } from '../services/api'
import { createConversation, getConversations, getMessages, sendMessage } from '../services/chat'
import type { ChatMessage, Conversation } from '../types/chat'

export function ChatPage() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [selected, setSelected] = useState<number | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [text, setText] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState(false)
  const locked = useRef(false)
  const version = useRef(0)
  const end = useRef<HTMLDivElement>(null)
  const pending = useRef<{ id: string, text: string, conversation: number } | null>(null)

  useEffect(() => {
    let active = true
    getConversations().then((data) => {
      if (active) setConversations(data)
    }).catch((error) => {
      if (active) setError(errorMessage(error))
    }).finally(() => {
      if (active) setLoading(false)
    })
    return () => { active = false; version.current += 1 }
  }, [])

  useEffect(() => {
    end.current?.scrollIntoView({ block: 'nearest' })
  }, [messages, busy])

  async function openConversation(id: number) {
    if (locked.current) return
    const current = ++version.current
    if (selected !== id) {
      setText('')
      pending.current = null
    }
    setSelected(id)
    setMessages([])
    setLoading(true)
    setError('')
    try {
      const data = await getMessages(id)
      if (current !== version.current) return
      setMessages(data)
      if (pending.current && data.some((message) => message.requisicaoId === pending.current?.id)) {
        pending.current = null
        setText('')
      }
    } catch (error) {
      if (current === version.current) setError(errorMessage(error))
    } finally {
      if (current === version.current) setLoading(false)
    }
  }

  async function startConversation() {
    if (locked.current) return
    locked.current = true
    setBusy(true)
    setError('')
    ++version.current
    try {
      const conversation = await createConversation()
      setConversations((items) => [conversation, ...items])
      setSelected(conversation.id)
      setMessages([])
      setText('')
      pending.current = null
    } catch (error) {
      setError(errorMessage(error))
    } finally {
      locked.current = false
      setBusy(false)
    }
  }

  async function refresh() {
    if (locked.current) return
    if (selected !== null) {
      await openConversation(selected)
    } else {
      setLoading(true)
      setError('')
      try { setConversations(await getConversations()) }
      catch (error) { setError(errorMessage(error)) }
      finally { setLoading(false) }
    }
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const content = text.trim()
    if (locked.current || loading || selected === null || !content || content.length > 2000) return
    locked.current = true
    setBusy(true)
    setError('')
    if (!pending.current || pending.current.text !== content || pending.current.conversation !== selected) {
      pending.current = { id: crypto.randomUUID(), text: content, conversation: selected }
    }
    try {
      const data = await sendMessage(selected, content, pending.current.id)
      setMessages(data)
      setText('')
      pending.current = null
      setConversations((items) => items.map((item) => item.id === selected && item.titulo === 'Nova conversa'
        ? { ...item, titulo: Array.from(content).slice(0, 60).join('') } : item))
    } catch (error) {
      setError(errorMessage(error))
    } finally {
      locked.current = false
      setBusy(false)
    }
  }

  return (
    <section className="space-y-5" aria-label="Chat com a Gaia">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Converse com a Gaia</h2>
          <p className="mt-2 text-sm text-slate-600">Ideias para sua próxima missão e recompensas para acompanhar suas conquistas.</p>
        </div>
        <button className="btn-secondary" disabled={busy || loading} onClick={() => void refresh()}>Atualizar conversa</button>
      </div>
      <div className="grid items-start gap-6 lg:grid-cols-[16rem_1fr]">
        <aside className="card space-y-4">
          <button className="btn-primary w-full" disabled={busy || loading} onClick={() => void startConversation()}>Nova conversa</button>
          <h3 className="font-bold">Suas conversas</h3>
          <div className="max-h-72 space-y-2 overflow-y-auto lg:max-h-[28rem]">
            {conversations.map((conversation) => (
              <button key={conversation.id} disabled={busy || loading} aria-pressed={selected === conversation.id}
                onClick={() => void openConversation(conversation.id)}
                className={`w-full break-words rounded-xl px-4 py-3 text-left text-sm disabled:opacity-50 ${selected === conversation.id ? 'bg-gaia-100 font-semibold text-gaia-900' : 'bg-slate-50 text-slate-600 hover:bg-gaia-50'}`}>
                {conversation.titulo}
                <span className="mt-1 block text-xs font-normal">{new Date(conversation.data).toLocaleDateString('pt-BR')}</span>
              </button>
            ))}
            {!loading && conversations.length === 0 && <p className="text-sm text-slate-500">Sua primeira conversa começa aqui.</p>}
          </div>
        </aside>
        <div className="card min-w-0 space-y-5">
          <Feedback error={error} />
          {loading && <p role="status" className="text-sm text-slate-500">Carregando conversa...</p>}
          {selected === null ? (
            <div className="space-y-4 py-8 text-center">
              <img src="/images/gaia-login.png" alt="Gaia pronta para conversar" className="mx-auto h-44 w-52 object-contain" />
              <h3 className="text-xl font-bold text-gaia-900">Vamos dar o próximo passo?</h3>
              <p className="text-sm leading-6 text-slate-600">Escolha uma conversa ou comece uma nova. Posso ajudar com seu saldo, missões disponíveis e recompensas.</p>
            </div>
          ) : (
            <>
              <div role="log" aria-label="Mensagens da conversa" aria-live="polite" aria-busy={loading || busy} className="max-h-[28rem] space-y-4 overflow-y-auto pr-2">
                {!loading && messages.length === 0 && <p className="rounded-xl bg-gaia-50 p-4 text-sm leading-6 text-gaia-900">Olá! Pergunte quais missões você pode realizar ou quais recompensas combinam com seu saldo.</p>}
                {messages.map((message) => (
                  <div key={message.id} className={`max-w-[95%] rounded-2xl p-4 sm:max-w-[85%] ${message.autor === 'usuario' ? 'ml-auto bg-gaia-600 text-white' : 'bg-gaia-50 text-slate-800'}`}>
                    <p className="mb-2 text-xs font-bold">{message.autor === 'usuario' ? 'Você' : 'Gaia'}</p>
                    <p className="whitespace-pre-wrap break-words text-sm leading-7">{message.texto}</p>
                    <time dateTime={message.data} className="mt-2 block text-xs opacity-70">{new Date(message.data).toLocaleString('pt-BR')}</time>
                  </div>
                ))}
                {busy && <p role="status" className="text-sm text-gaia-700">A Gaia está preparando sua resposta...</p>}
                <div ref={end} />
              </div>
              <form onSubmit={(event) => void submit(event)} className="space-y-3">
                <label htmlFor="chat-message" className="text-sm font-semibold">Sua mensagem</label>
                <textarea id="chat-message" className="field min-h-28 resize-y" value={text} maxLength={2000} disabled={busy || loading}
                  onChange={(event) => setText(event.target.value)} placeholder="O que posso fazer com meus pontos?" aria-describedby="chat-help" />
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs text-slate-500">{text.length}/2000</span>
                  <button className="btn-primary" disabled={busy || loading || !text.trim()} type="submit">{busy ? 'Enviando...' : 'Enviar mensagem'}</button>
                </div>
              </form>
            </>
          )}
          <p id="chat-help" className="text-xs leading-5 text-slate-500">Suas mensagens e dados da jornada são enviados à IA para responder e ficam salvos na sua conta. Não inclua senhas. Confira os dados no catálogo antes de realizar uma ação.</p>
          <div className="flex flex-wrap gap-4 border-t border-gaia-100 pt-4 text-sm font-semibold text-gaia-700">
            <Link to="/solucao/missoes" className="underline">Ver missões</Link>
            <Link to="/solucao/recompensas" className="underline">Ver recompensas</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
