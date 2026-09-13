# GAIA - Assistente Virtual para a SoulUp

## Descrição do projeto

O GAIA é um projeto acadêmico desenvolvido para o Challenge SoulUp da FIAP. A solução apresenta uma assistente virtual em formato de avatar que orienta os usuários dentro da plataforma SoulUp, incentiva a conclusão de missões sustentáveis e oferece pontos extras.

Os pontos recebidos podem ser usados em uma loja de acessórios para personalizar a GAIA. Nesta Sprint 4, o projeto original foi migrado para uma aplicação SPA com React, Vite e TypeScript.

## Funcionalidades

- Navegação SPA entre todas as páginas;
- registro de conclusão de missões;
- saldo de pontos compartilhado entre as páginas;
- loja de acessórios;
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
├── data/        # Dados temporários de missões e acessórios
├── pages/       # Páginas da aplicação
├── types/       # Interfaces TypeScript
├── App.tsx      # Rotas da aplicação
├── index.css    # Tailwind e tema visual
└── main.tsx     # Entrada do React
```

## Integração com a API

A integração será realizada com a API Java desenvolvida na disciplina de Domain Driven Design Using Java. Enquanto o contrato da API não está disponível, missões, acessórios e pontos funcionam localmente para permitir a navegação e a avaliação da interface.

Quando a API estiver disponível, copie `.env.example` para `.env` e informe a URL publicada:

```env
VITE_API_URL=https://endereco-da-api
```

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

### Yuto Inoue

- RM: 573161
- Turma: 1TDSPv-2026
- GitHub: <https://github.com/yutoinouee>
- LinkedIn: <https://www.linkedin.com/in/yuto-inoue-713348373?utm_source=share_via&utm_content=profile&utm_medium=member_ios>

name: 'Yuto Inoue',
    rm: '573161',
    className: '1TDSPv-2026',
    image: '/images/yuto.jpeg',
    github: 'https://github.com/yutoinouee',
    linkedin: 'https://www.linkedin.com/in/yuto-inoue-713348373?utm_source=share_via&utm_content=profile&utm_medium=member_ios'

### Gustavo Costa

- RM: 573074
- Turma: 1TDSPv-2026
- GitHub: <https://github.com/gcosta900>
- LinkedIn: <https://www.linkedin.com/in/gustavocostamoreira>

## Links da entrega

- Repositório GitHub: <https://github.com/henriquemunizz/GAIA-React>
- Aplicação publicada na Vercel: 
- API Java publicada: 
- Vídeo de apresentação: 


