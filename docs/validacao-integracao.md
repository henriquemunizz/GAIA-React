# Validação da integração Gaia

Ambiente: front em `http://localhost:5173`, API Java em `http://localhost:8080`, Oracle configurado na execução local do IntelliJ. Verificação realizada em 02/11/2026. Nenhuma credencial é registrada neste documento.

## Verificações automatizadas

- `npm run lint`: aprovado.
- `npm test`: 9 testes aprovados da camada HTTP, sem acessar o banco.
- `npm run build`: TypeScript e build de produção aprovados.
- `git diff --check`: sem erros de whitespace.

Os testes cobrem envio de cookie e JSON, ausência de Bearer, PUT 200 vazio, DELETE/logout 204, valores de progresso, 401, 403, validações 400, conflitos 409, falha de conexão e corpo interrompido sem repetição de POST, e resposta inválida em HTML.

## Verificações reais pelas telas

| Fluxo | Resultado observado |
| --- | --- |
| Home, Sobre, Integrantes, FAQ e Contato | Navegação preservada |
| Cadastro vazio | Campos obrigatórios sinalizados |
| Cadastro de usuário comum | Conta persistida e login realizado |
| Login ADMIN | Perfil administrativo reconhecido e dados existentes carregados |
| Atalho no cadastro | “Entrar como administrador” abre o login e explica cadastro/alteração de missões e recompensas |
| Conta comum usando o atalho ADMIN | Permanece USUARIO, sem controles de administração |
| Sessão após recarregar | Perfil e progresso restaurados por cookie |
| Logout e acesso direto ao Perfil | Redirecionamento ao login |
| Missões e recompensas inativas | Ocultas para usuário comum; visíveis e com ação desabilitada para ADMIN |
| Cadastro administrativo | Missão e recompensa temporárias persistidas |
| Edição administrativa | Pontos/dificuldade da missão e descrição da recompensa atualizados; PUT vazio tratado |
| Duplo clique em concluir missão | Apenas uma conclusão, 30 pontos |
| Repetir a mesma missão | Segunda conclusão, total e saldo de 60 pontos |
| Resgatar recompensa de 40 pontos | Total ganho 60; saldo 20; duas missões concluídas |
| Resgatar sem saldo | Mensagem “Pontos insuficientes”; valores preservados |
| Históricos | Duas conclusões de 30 pontos e um resgate de 40 pontos, com datas |
| Editar a própria conta sem senha | Nome atualizado e sessão mantida |
| Perfil em tela pequena | Conteúdo em coluna, sem overflow horizontal da página |

## Roteiro para repetir

1. Inicie a API com `GAIA_FRONTEND_ORIGIN=http://localhost:5173` e o front com `npm run dev`.
2. No cadastro, confira os campos obrigatórios, a escolha de tipo de conta (Usuário = 0, Administrador = 1) e o atalho administrativo. Crie uma conta temporária de cada tipo.
3. Com a conta Administrador, crie uma missão e uma recompensa identificadas como teste. Edite dificuldade, pontos e descrição nos cards sobrepostos.
4. Na conta comum, conclua a mesma missão duas vezes; confira pontos, quantidade de conclusões e históricos. Resgate uma recompensa e tente outra sem saldo.
5. Recarregue a página, edite o nome da própria conta sem preencher a senha e confirme a persistência.
6. Como ADMIN, tente excluir os itens com histórico: a API deve retornar 409. Use a alternativa de desativação e confira que os itens deixam de aparecer para USUARIO.
7. Após autorização para apagar os dados temporários, exclua a própria conta de teste e confira logout. Os itens sem o histórico dessa conta podem então ser excluídos pelo ADMIN.
8. Faça logout e tente acessar `/solucao/perfil` diretamente. O front deve solicitar login.

## Limites da verificação

A troca de senha pela tela e a espera real de 30 minutos pela expiração não foram executadas. O frontend valida senha, omite o campo vazio em atualizações e trata 401; as regras de sessão e autorização permanecem sob responsabilidade da API. Os testes HTTP de 400/401/403/409 usam respostas simuladas e complementam, sem substituir, os testes reais listados acima.

Na rodada de 02/11, as exclusões definitivas não foram executadas. A rodada abaixo validou a exclusão de dois novos itens, após autorização do responsável.

## Perfis numéricos e cards sobrepostos — 03/11/2026

- Oracle convertido de ADMIN/USUARIO para `NUMBER(1)` com valores 1/0. Foram comparados os dados antes e depois da migração: 3 contas, 3 registros de progresso, 5 conclusões, 2 resgates, 3 missões e 3 recompensas preservados. A coluna textual anterior foi mantida como respaldo.
- A conta administrativa existente entrou com a mesma senha e manteve 60 pontos totais, saldo 10 e 3 conclusões.
- Cadastro e login pelas telas aprovados para os dois tipos. A conta `qa_admin_perfil_1103` recebeu controles administrativos; `qa_usuario_perfil_1103` não recebeu esses controles. Ambas ficaram disponíveis no ambiente de testes.
- Missão e recompensa `QA modal 1103` cadastradas e editadas pelos cards sobrepostos. Os dois itens foram excluídos pelas telas, com autorização específica, e desapareceram do catálogo. Nenhum registro anterior foi excluído.
- Formulários, confirmação de exclusão e mensagens de validação aparecem dentro do card. Fundo escurecido, bloqueio de rolagem, Escape, Cancelar e retorno do foco ao botão de origem conferidos.
- Card de recompensa verificado em 390 × 844, centralizado e sem overflow horizontal. As dimensões do navegador foram restauradas após o teste.
- `npm run lint`, os 9 testes HTTP e `npm run build` aprovados. Na API, `mvn clean package` com JDK 21 aprovou compilação, empacotamento e 10 testes.

Nesta rodada, o conflito 409 com desativação não foi repetido pelas telas para preservar os itens e históricos existentes. A troca de senha e a expiração por tempo continuam com os limites descritos acima.
