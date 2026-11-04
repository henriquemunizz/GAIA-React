import assert from 'node:assert/strict'
import { afterEach, test } from 'node:test'
import { ApiError, request } from '../src/services/api.ts'

const originalFetch = globalThis.fetch
const originalWindow = globalThis.window

afterEach(() => {
  globalThis.fetch = originalFetch
  if (originalWindow === undefined) delete globalThis.window
  else globalThis.window = originalWindow
})

test('envia cookie de sessão e JSON, sem autenticação Bearer', async () => {
  let sent
  globalThis.fetch = async (url, options) => {
    sent = { url, ...options }
    return Response.json({ id: 1, nomeUsuario: 'teste', perfil: 0 })
  }
  const body = JSON.stringify({ nomeUsuario: 'teste', senha: 'senha-de-teste' })
  const user = await request('/usuarios/login', { method: 'POST', body })
  assert.equal(user.perfil, 0)
  assert.equal(sent.url, 'http://localhost:8080/usuarios/login')
  assert.equal(sent.credentials, 'include')
  assert.equal(sent.headers['Content-Type'], 'application/json')
  assert.equal(sent.headers.Authorization, undefined)
  assert.equal(sent.body, body)
})

test('aceita PUT 200 sem corpo e DELETE/logout 204', async () => {
  for (const status of [200, 204]) {
    globalThis.fetch = async () => new Response(null, { status })
    assert.equal(await request('/missoes/1', { method: status === 200 ? 'PUT' : 'DELETE' }), undefined)
  }
})

test('mantém os três valores de progresso retornados pela API', async () => {
  const progress = { pontosTotais: 100, saldo: 30, missoesConcluidas: 4 }
  globalThis.fetch = async () => Response.json(progress)
  assert.deepEqual(await request('/usuarios/me/recompensas/1/resgatar', { method: 'POST' }), progress)
})

test('expira sessão em 401 de rota protegida, mas preserva o erro de login', async () => {
  globalThis.window = new EventTarget()
  let expired = 0
  window.addEventListener('gaia:session-expired', () => { expired += 1 })
  globalThis.fetch = async () => Response.json({ erro: 'Operação não permitida', detalhe: 'Faça login' }, { status: 401 })
  await assert.rejects(request('/usuarios/me'), (error) => error instanceof ApiError && error.status === 401)
  assert.equal(expired, 1)
  await assert.rejects(request('/usuarios/login', { method: 'POST' }), /Faça login/)
  assert.equal(expired, 1)
})

test('403 sinaliza reconsulta do perfil e mantém a autorização da API', async () => {
  globalThis.window = new EventTarget()
  let changed = 0
  window.addEventListener('gaia:permission-changed', () => { changed += 1 })
  globalThis.fetch = async () => Response.json({ detalhe: 'Acesso exclusivo do administrador' }, { status: 403 })
  await assert.rejects(request('/missoes', { method: 'POST' }), /Acesso exclusivo do administrador/)
  assert.equal(changed, 1)
})

test('exibe validações de campos e conflitos de histórico/saldo', async () => {
  globalThis.fetch = async () => Response.json({ nomeUsuario: 'Nome inválido', senha: 'Senha curta' }, { status: 400 })
  await assert.rejects(request('/usuarios', { method: 'POST' }), /nomeUsuario: Nome inválido. senha: Senha curta/)
  for (const detalhe of ['Saldo insuficiente', 'Este item possui histórico']) {
    globalThis.fetch = async () => Response.json({ erro: 'Conflito', detalhe }, { status: 409 })
    await assert.rejects(request('/missoes/1', { method: 'DELETE' }), (error) => error.status === 409 && error.message === detalhe)
  }
})

test('não repete uma mutação após falha de rede ou erro do servidor', async () => {
  let attempts = 0
  globalThis.fetch = async () => { attempts += 1; throw new TypeError('Failed to fetch') }
  await assert.rejects(request('/usuarios/me/missoes/1/concluir', { method: 'POST' }), /Atualize|atualize/)
  assert.equal(attempts, 1)
  globalThis.fetch = async () => { attempts += 1; return new Response('Erro', { status: 500 }) }
  await assert.rejects(request('/usuarios/me/missoes/1/concluir', { method: 'POST' }), /500/)
  assert.equal(attempts, 2)
})

test('não apresenta sucesso quando o servidor devolve HTML no lugar de JSON', async () => {
  globalThis.fetch = async () => new Response('<html>Erro de proxy</html>')
  await assert.rejects(request('/usuarios/me/progresso'), /resposta do servidor/)
})

test('trata falha ao receber o corpo sem repetir a conclusão', async () => {
  let attempts = 0
  globalThis.fetch = async () => {
    attempts += 1
    return { text: async () => { throw new TypeError('Connection interrupted') } }
  }
  await assert.rejects(request('/usuarios/me/missoes/1/concluir', { method: 'POST' }), (error) => error instanceof ApiError && error.status === 0 && error.message.includes('atualize os dados'))
  assert.equal(attempts, 1)
})
