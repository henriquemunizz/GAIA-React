import { useEffect, useId, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

interface ModalProps {
  title: string
  busy?: boolean
  onClose: () => void
  children: ReactNode
}

export function Modal({ title, busy = false, onClose, children }: ModalProps) {
  const dialog = useRef<HTMLDialogElement>(null)
  const titleId = useId()

  useEffect(() => {
    const element = dialog.current
    const previousFocus = document.activeElement
    const previousOverflow = document.body.style.overflow
    element?.showModal()
    document.body.style.overflow = 'hidden'

    return () => {
      element?.close()
      document.body.style.overflow = previousOverflow
      if (previousFocus instanceof HTMLElement) previousFocus.focus()
    }
  }, [])

  return createPortal(
    <dialog
      ref={dialog}
      className="gaia-modal rounded-[1.25rem] bg-white text-slate-900 shadow-2xl"
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault()
        if (!busy) onClose()
      }}
    >
      <div className="flex items-center justify-between gap-4 border-b border-gaia-100 px-6 py-5 sm:px-7">
        <h2 id={titleId} className="text-xl font-bold">{title}</h2>
        <button type="button" className="shrink-0 rounded-full px-3 py-2 text-xl text-gaia-700 hover:bg-gaia-50 disabled:opacity-50" aria-label="Fechar janela" disabled={busy} onClick={onClose}>×</button>
      </div>
      <div className="p-6 sm:p-7">{children}</div>
    </dialog>,
    document.body,
  )
}
