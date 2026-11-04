import { useEffect, useRef } from 'react'
import type { ChatMessage } from '../types/chat'

interface MessageListProps {
  messages: ChatMessage[]
  sending: string
  loading: boolean
  avatar: string
}

export function MessageList({ messages, sending, loading, avatar }: MessageListProps) {
  const end = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (end.current) end.current.scrollTop = end.current.scrollHeight
  }, [messages, sending])

  return (
    <div ref={end} role="log" aria-label="Mensagens da conversa" aria-live="polite"
      className="h-[clamp(17rem,47dvh,32rem)] space-y-3 overflow-y-auto bg-linear-to-b from-white to-gaia-50/60 p-4 sm:p-6">
      {loading ? <p role="status" className="text-sm text-slate-500">Carregando conversa...</p> : !messages.length && !sending && (
        <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
          <img src={avatar} alt="" className="h-20 object-contain" />
          <h3 className="text-xl font-bold text-gaia-950">Vamos conversar?</h3>
          <p className="max-w-xs text-sm text-slate-600">Pergunte sobre suas missões, seus pontos ou a próxima recompensa.</p>
        </div>
      )}
      {messages.map((message) => (
        <div key={message.id} className={`w-fit max-w-[88%] rounded-2xl px-4 py-2.5 ${message.autor === 'usuario' ? 'ml-auto rounded-br-sm bg-gaia-700 text-white' : 'rounded-bl-sm bg-gaia-100 text-gaia-950'}`}>
          <p className="whitespace-pre-wrap break-words text-sm leading-6">{message.texto}</p>
          <p className="mt-1 text-right text-xs opacity-80">{message.autor === 'usuario' ? 'Você' : 'Gaia'} · <time dateTime={message.data} title={new Date(message.data).toLocaleString('pt-BR')}>{new Date(message.data).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</time></p>
        </div>
      ))}
      {sending && <>
        <p className="ml-auto w-fit max-w-[88%] whitespace-pre-wrap break-words rounded-2xl rounded-br-sm bg-gaia-700 px-4 py-2.5 text-sm text-white">{sending}</p>
        <p role="status" className="text-sm text-gaia-700">Gaia está digitando…</p>
      </>}
    </div>
  )
}
