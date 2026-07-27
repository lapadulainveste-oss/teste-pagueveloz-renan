# 🧪 Desafio técnico - Utizando Cypress para realizar testes de API Rest

## 📖 Desafio 1: Testar o verbo + endpoints abaixo:

| Verbo | BaseUrl | Endpoint |
|-------|---------|----------|
| GET | https://jsonplaceholder.typicode.com | /posts |
| GET | https://jsonplaceholder.typicode.com | /posts/1 |
| GET | https://jsonplaceholder.typicode.com | /posts/1/comments |
| GET | https://jsonplaceholder.typicode.com | /comments?postId=1 |
| POST | https://jsonplaceholder.typicode.com | /posts |
| PUT | https://jsonplaceholder.typicode.com | /posts/1 |
| PATCH | https://jsonplaceholder.typicode.com | /posts/1 |
| DELETE | https://jsonplaceholder.typicode.com | /posts/1 |

## 📖 Desafio 2: Realize testes para os endpoints listado acima que valide os seguintes aspectos:
- Validar o status code
- Validar o tempo de resposta (se for maior que 500ms o teste deve falhar)
- Validar o corpo de resposta a nível de schema

---

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D%2016-brightgreen)](https://nodejs.org)
[![Cypress](https://img.shields.io/badge/Cypress-%3E%3D%2013-brightgreen)](https://cypress.io)

Testes automatizados de API REST usando Cypress com validação de schema, status code e performance.

## 📖 Sumário

- [Instalação](#instalação)
- [Como Usar](#como-usar)
- [Estrutura](#estrutura)
- [Endpoints Testados](#endpoints-testados)
- [Validações](#validações)

---

## 🚀 Instalação

```bash
# Clonar repositório
git clone https://github.com/lapadulainveste-oss/teste-pagueveloz-renan.git
cd teste-pagueveloz-renan

# Instalar dependências (inclui Cypress e AJV)
npm install
```

### ⚠️ Importante: AJV (JSON Schema Validator)

O projeto usa **AJV** para validação de schema JSON. Ele é instalado automaticamente com `npm install`.

**Por que AJV?**
- Valida se a resposta da API tem a estrutura esperada
- Verifica tipos de dados (string, number, etc)
- Garante campos obrigatórios estão presentes
- Detecta mudanças no contrato de dados da API

Se precisar instalar manualmente:
```bash
npm install ajv
```

---

## 📖 Como Usar

### Modo UI (Interativo)
```bash
npm run cy:open
```

### Modo Headless (Automatizado)
```bash
npm run cy:run
```
### Gerar relatório
```bash
npm run cy:report
```

### Apenas testes de API
```bash
npm run cy:run:api
```

### Com navegador visível
```bash
npm run cy:run:headed
```

### Modo Debug
```bash
npm run cy:debug
```

---

## 📁 Estrutura

```
cypress/
├── e2e/api/
│   └── posts.cy.js              # Testes dos endpoints
├── fixtures/
│   └── posts.json               # Dados de teste e schemas
├── support/
│   ├── commands.js              # Comandos customizados
│   ├── api-config.js            # Endpoints centralizados
│   └── schema-validator.js      # Validador de schema (AJV)
└── config/
```

---

## 🔗 Endpoints Testados

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/posts` | Listar todos os posts |
| GET | `/posts/:id` | Obter post específico |
| GET | `/posts/:id/comments` | Comentários de um post |
| GET | `/comments?postId=:id` | Filtrar comentários |
| POST | `/posts` | Criar novo post |
| PUT | `/posts/:id` | Atualizar post completo |
| PATCH | `/posts/:id` | Atualizar parcialmente |
| DELETE | `/posts/:id` | Deletar post |

---

## ✅ Validações

Cada teste valida:

1. **Status Code** - Código HTTP correto (200, 201, 404, etc)
   ```javascript
   cy.validateStatusCode(response, HTTP_STATUS.OK)
   ```

2. **Tempo de Resposta** - Performance < 500ms
   ```javascript
   cy.validateResponseTime(response, RESPONSE_TIME_LIMIT)
   ```

3. **Schema JSON** - Estrutura e tipos de dados (com AJV)
   ```javascript
   expect(validateSchema(response.body, fixtureData.postSchema)).to.be.true
   ```

4. **Conteúdo** - Dados específicos e completos

---

## 🎨 Design Patterns

- **Repository Pattern** - Endpoints centralizados em `api-config.js`
- **Page Object Pattern** - Comandos customizados em `commands.js`
- **Fixture Pattern** - Dados de teste em `posts.json`

---

## 📝 Exemplo de Teste

```javascript
it('Deve retornar todos os posts com status 200', () => {
  cy.request('GET', `${Cypress.env('apiUrl')}${API_ENDPOINTS.posts}`)
    .then(response => {
      const { body } = response

      cy.validateStatusCode(response, HTTP_STATUS.OK)
      cy.validateResponseTime(response, RESPONSE_TIME_LIMIT)
      expect(validateArraySchema(body, fixtureData.postSchema)).to.be.true
      expect(body).to.be.an('array').and.to.have.length.greaterThan(0)
    })
})
```

---

## 🔄 Configuração

Edite `.env.local` para mudar a URL da API:

```env
CYPRESS_API_URL=https://jsonplaceholder.typicode.com
```

Ou modifique `cypress.config.js` para alterar timeouts.

---

## 🐛 Troubleshooting

**Erro: "Module not found"**
```bash
rm -rf node_modules && npm install
```

**Erro: "Schema validation failed"**
- Verifique o schema em `cypress/fixtures/posts.json`
- Confirme se a API retorna os campos esperados

**Erro: "Command timed out"**
- Aumentar timeout em `cypress.config.js`: `responseTimeout: 20000`

---

## 📄 Licença

MIT License - Veja [LICENSE](LICENSE) para detalhes.

---

**Desenvolvido por Renan Lapadula**
