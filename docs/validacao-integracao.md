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
2. No cadastro, confira os campos obrigatórios e o atalho administrativo. Crie uma conta temporária USUARIO; não altere perfis pelo cliente.
3. Com uma conta ADMIN já configurada, crie uma missão e uma recompensa identificadas como teste. Edite dificuldade, pontos e descrição.
4. Na conta comum, conclua a mesma missão duas vezes; confira pontos, quantidade de conclusões e históricos. Resgate uma recompensa e tente outra sem saldo.
5. Recarregue a página, edite o nome da própria conta sem preencher a senha e confirme a persistência.
6. Como ADMIN, tente excluir os itens com histórico: a API deve retornar 409. Use a alternativa de desativação e confira que os itens deixam de aparecer para USUARIO.
7. Após autorização para apagar os dados temporários, exclua a própria conta de teste e confira logout. Os itens sem o histórico dessa conta podem então ser excluídos pelo ADMIN.
8. Faça logout e tente acessar `/solucao/perfil` diretamente. O front deve solicitar login.

## Limites da verificação

A troca de senha pela tela e a espera real de 30 minutos pela expiração não foram executadas. O frontend valida senha, omite o campo vazio em atualizações e trata 401; as regras de sessão e autorização permanecem sob responsabilidade da API. Os testes HTTP de 400/401/403/409 usam respostas simuladas e complementam, sem substituir, os testes reais listados acima.

As exclusões definitivas e a limpeza dos dados temporários aguardam confirmação do responsável pelo ambiente.
