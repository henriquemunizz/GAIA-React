const API_URL = (import.meta.env?.VITE_API_URL || 'http://localhost:8080').replace(/\/+$/, '')

export class ApiError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

export function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'Não foi possível realizar a operação.'
}

export async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  let response: Response
  let text: string

  try {
    response = await fetch(`${API_URL}${path}`, {
      ...options,
      credentials: 'include',
      headers: {
        ...(options.body ? { 'Content-Type': 'application/json' } : {}),
        ...options.headers,
      },
    })
    text = await response.text()
  } catch {
    // A ação pode ter chegado ao servidor. Nunca repetir POST automaticamente.
    throw new ApiError('Não foi possível confirmar a operação. Verifique sua conexão e atualize os dados antes de tentar novamente.', 0)
  }

  let data: unknown

  try {
    data = text ? JSON.parse(text) : undefined
  } catch {
    data = undefined
  }

  if (!response.ok) {
    if (response.status === 401 && path !== '/usuarios/login') {
      window.dispatchEvent(new Event('gaia:session-expired'))
    }
    if (response.status === 403) {
      window.dispatchEvent(new Event('gaia:permission-changed'))
    }

    let message = `Não foi possível realizar a operação (${response.status}).`
    if (data && typeof data === 'object') {
      const fields = data as Record<string, unknown>
      if (typeof fields.detalhe === 'string') {
        message = fields.detalhe
      } else if (typeof fields.erro === 'string') {
        message = fields.erro
      } else if (response.status === 400) {
        message = Object.entries(fields)
          .filter(([, value]) => typeof value === 'string')
          .map(([field, value]) => `${field}: ${value}`)
          .join('. ') || message
      }
    }
    throw new ApiError(message, response.status)
  }

  if (text && data === undefined) {
    throw new ApiError('A resposta do servidor não pôde ser confirmada. Atualize os dados antes de tentar novamente.', response.status)
  }

  // PUT dos catálogos retorna 200 vazio; DELETE/logout retornam 204.
  return data as T
}
