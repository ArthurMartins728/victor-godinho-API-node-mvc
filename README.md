# API de Produtos em Node.js (arquitetura MVC)

**Aluno:** Victor Godinho
**Disciplina:** Programação Web III (PW3) - Atividade Prática 02

API REST de cadastro de produtos feita com Node.js, Express e MySQL. O código é separado em camadas (MVC). Como a aplicação é só backend, a "View" são as respostas em JSON enviadas pelo Express.

## Como rodar

1. Instale as dependências:
   ```
   npm install
   ```
2. Crie o banco `loja_mvc` e a tabela `produtos` executando o arquivo `schema.sql` no MySQL (pelo Workbench ou com `mysql -u root -p -e "source schema.sql"`).
3. Copie `.env.example` para `.env` e preencha `DB_PASSWORD` com a senha do seu MySQL.
4. Inicie a API:
   ```
   npm start
   ```

A API fica em `http://localhost:3000`.

## Rotas

| Método | Rota            | O que faz                    |
|--------|-----------------|------------------------------|
| GET    | `/produtos`     | Lista todos os produtos      |
| GET    | `/produtos/:id` | Busca um produto pelo id     |
| POST   | `/produtos`     | Cadastra um produto          |
| PUT    | `/produtos/:id` | Atualiza um produto          |
| DELETE | `/produtos/:id` | Remove um produto            |

Corpo do POST e do PUT:

```json
{ "nome": "Mouse sem fio", "preco": 59.9, "estoque": 20 }
```

Códigos de resposta usados: 200 (ok), 201 (criado), 400 (dados inválidos), 404 (produto não encontrado) e 500 (erro no servidor).

## Arquitetura em camadas

- **src/config/db.js:** cria o pool de conexões com o MySQL, lendo os dados do `.env` com `dotenv`.
- **src/models/produtoModel.js:** é o único arquivo com SQL (`SELECT`, `INSERT`, `UPDATE`, `DELETE`), sempre com parâmetros `?` para evitar SQL Injection.
- **src/controllers/produtoController.js:** recebe `req`, valida os dados, chama a Model e devolve `res` com o status HTTP adequado.
- **src/routes/produtoRoutes.js:** usa `express.Router()` para ligar cada verbo HTTP à função do Controller.
- **src/server.js:** configura o Express (`express.json()`), registra as rotas e sobe o servidor, sem nenhuma query SQL.

## Segurança

O `.gitignore` bloqueia `node_modules/` e `.env`. O `.env.example` mostra as variáveis necessárias sem expor senhas reais.
