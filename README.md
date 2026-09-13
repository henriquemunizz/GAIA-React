# GAIA - Assistente Virtual para a SoulUp

## Descrição do projeto

O GAIA é um projeto acadêmico desenvolvido para o Challenge SoulUp da FIAP. A solução apresenta uma assistente virtual em formato de avatar que orienta os usuários dentro da plataforma SoulUp, incentiva a conclusão de missões sustentáveis e oferece pontos extras.

Os pontos recebidos podem ser usados em uma loja de acessórios para personalizar a GAIA. Nesta Sprint 4, o projeto original foi migrado para uma aplicação SPA com React, Vite e TypeScript.

## Funcionalidades

- Navegação SPA entre todas as páginas;
- registro de conclusão de missões;
- consulta e cadastro de missões pela API Java;
- saldo de pontos compartilhado entre as páginas;
- loja de acessórios;
- consulta e cadastro de recompensas pela API Java;
- página dinâmica de detalhes de cada acessório;
- validação do formulário de contato;
- página de integrantes;
- layout responsivo para celular e computador;
- página para endereços não encontrados.

## Tecnologias utilizadas

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router DOM
- React Hook Form
- Git e GitHub

## Como usar

### Pré-requisitos

- Node.js instalado;
- npm instalado.

### Instalação

```bash
npm install
```

### Execução

```bash
npm run dev
```

Abra o endereço exibido no terminal, normalmente `http://localhost:5173`.

### Verificação do projeto

```bash
npm run lint
npm run build
```

## Rotas

| Rota | Página |
| --- | --- |
| `/` | Home |
| `/sobre` | Sobre o projeto |
| `/integrantes` | Integrantes |
| `/faq` | Perguntas frequentes |
| `/contato` | Contato |
| `/assistente` | Assistente e missões |
| `/loja` | Loja de acessórios |
| `/loja/:id` | Detalhes de um acessório |

## Estrutura de pastas

```text
src/
├── components/  # Componentes reutilizáveis
├── context/     # Estado compartilhado de pontos
├── hooks/       # Busca de missões e recompensas
├── pages/       # Páginas da aplicação
├── services/    # Requisições HTTP para a API Java
├── types/       # Interfaces TypeScript
├── App.tsx      # Rotas da aplicação
├── index.css    # Tailwind e tema visual
└── main.tsx     # Entrada do React
```

## Integração com a API Java

A aplicação consome a branch `develop` do projeto [GAIA BackEnd Sprint 3](https://github.com/henriquemunizz/GAIA-BackEnd-Sprint-3/tree/develop). As missões vêm de `/missoes` e as recompensas vêm de `/recompensas`. Os formulários das páginas Assistente e Loja enviam novos registros para esses endpoints com `POST`.

Para usar o backend local, copie `.env.example` para `.env`:

```env
VITE_API_URL=http://localhost:8080
```

Depois, inicie a API Java na porta 8080 e execute o front-end com `npm run dev`. A API precisa das variáveis `GAIA_DB_URL`, `GAIA_DB_USER` e `GAIA_DB_PASSWORD` para acessar o banco Oracle.

O saldo, a conclusão de missões e a compra de recompensas continuam locais porque a API atual ainda não possui endpoints para essas operações. Antes do deploy, o backend também precisa liberar no CORS o endereço publicado do front-end.

## Integrantes

### Henrique da Silva Muniz

- RM: 573874
- Turma: 1TDSPv-2026
- GitHub: <https://github.com/henriquemunizz>
- LinkedIn: <https://www.linkedin.com/in/henrique-muniz-044b05365>

### Erick Keiji Miyashiro

- RM: 568966
- Turma: 1TDSPv-2026
- GitHub: <https://share.google/xpS9gpDfEr3WzYZaw>
- LinkedIn: <https://www.linkedin.com/in/erick-keiji-miyashiro-6228b93b4>

### João Carlos Silva

- RM: 568952
- Turma: 1TDSPv-2026
- GitHub: <https://github.com/jocax007>
- LinkedIn: <https://www.linkedin.com/in/joão-carlos-lopes-957976264>

### Gustavo Costa

- RM: 573074
- Turma: 1TDSPv-2026
- GitHub: <https://github.com/gcosta900>
- LinkedIn: <https://www.linkedin.com/in/gustavocostamoreira>

## Links da entrega

- Repositório GitHub: <https://github.com/Durannd/gaia-sprint-4>
- Aplicação publicada na Vercel: **inserir link**
- API Java publicada: **inserir link**
- Vídeo de apresentação: **inserir link**

> A equipe deve criar o repositório, registrar os commits de cada integrante, publicar o front-end e a API e preencher os links acima antes da entrega final.
