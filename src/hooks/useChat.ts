import { useEffect, useRef, useState, type FormEvent } from 'react'
import { errorMessage } from '../services/api'
import { createConversation, getConversations, getMessages, sendMessage } from '../services/chat'
import type { ChatMessage, Conversation } from '../types/chat'

export function useChat() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [selected, setSelected] = useState<number | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [text, setText] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState(false)
  const locked = useRef(false)
  const version = useRef(0)
  const [sending, setSending] = useState('')
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
    if (locked.current || loading || !content || content.length > 2000) return
    locked.current = true
    setBusy(true)
    setError('')
    setSending(content)
    try {
      let id = selected
      if (id === null) {
        const conversation = await createConversation()
        id = conversation.id
        setConversations((items) => [conversation, ...items])
        setSelected(id)
      }
      if (!pending.current || pending.current.text !== content || pending.current.conversation !== id) {
        pending.current = { id: crypto.randomUUID(), text: content, conversation: id }
      }
      const data = await sendMessage(id, content, pending.current.id)
      setMessages(data)
      setText('')
      pending.current = null
      setConversations((items) => items.map((item) => item.id === id && item.titulo === 'Nova conversa'
        ? { ...item, titulo: Array.from(content).slice(0, 60).join('') } : item))
    } catch (error) {
      setError(errorMessage(error))
    } finally {
      setSending('')
      locked.current = false
      setBusy(false)
    }
  }

  return {
    conversations, selected, messages, text, setText, error, loading, busy, sending,
    openConversation, startConversation, refresh, submit,
  }
}
