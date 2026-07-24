const { API_ENDPOINTS, API_METHODS, RESPONSE_TIME_LIMIT, HTTP_STATUS } = require('../../support/api-config')
const { validateSchema, validateArraySchema } = require('../../support/schema-validator')

describe('JSONPlaceholder API - Posts Endpoints', () => {
  let fixtureData

  before(() => {
    cy.fixture('posts').then(data => {
      fixtureData = data
    })
  })

  context('GET /posts - Listar todos os posts', () => {
    it('Deve retornar todos os posts com status 200', () => {
      cy.request('GET', `${Cypress.env('apiUrl')}${API_ENDPOINTS.posts}`).then(response => {
        const { status, duration, body } = response

        cy.validateStatusCode(response, HTTP_STATUS.OK)
        cy.validateResponseTime(response, RESPONSE_TIME_LIMIT)
        expect(body).to.be.an('array')
        expect(body.length).to.be.greaterThan(0)
      })
    })

    it('Deve validar o schema de cada post na listagem', () => {
      cy.request('GET', `${Cypress.env('apiUrl')}${API_ENDPOINTS.posts}`).then(response => {
        const { body } = response

        expect(validateArraySchema(body, fixtureData.postSchema)).to.be.true
      })
    })
  })

  context('GET /posts/:id - Recuperar post específico', () => {
    it('Deve retornar um post específico com status 200', () => {
      cy.request('GET', `${Cypress.env('apiUrl')}${API_ENDPOINTS.postById(1)}`).then(response => {
        const { id, title, body, userId } = response.body

        cy.validateStatusCode(response, HTTP_STATUS.OK)
        cy.validateResponseTime(response, RESPONSE_TIME_LIMIT)
        expect(id).to.equal(1)
        expect(title).to.exist
        expect(body).to.exist
        expect(userId).to.exist
      })
    })

    it('Deve validar o schema do post recuperado', () => {
      cy.request('GET', `${Cypress.env('apiUrl')}${API_ENDPOINTS.postById(1)}`).then(response => {
        expect(validateSchema(response.body, fixtureData.postSchema)).to.be.true
      })
    })

    it('Deve retornar 404 ao buscar post inexistente', () => {
      cy.request({
        method: 'GET',
        url: `${Cypress.env('apiUrl')}${API_ENDPOINTS.postById(99999)}`,
        failOnStatusCode: false
      }).then(response => {
        expect(response.status).to.equal(HTTP_STATUS.NOT_FOUND)
      })
    })
  })

  context('GET /posts/:id/comments - Recuperar comentários do post', () => {
    it('Deve retornar os comentários de um post com status 200', () => {
      cy.request('GET', `${Cypress.env('apiUrl')}${API_ENDPOINTS.postComments(1)}`).then(response => {
        const { status, body } = response

        cy.validateStatusCode(response, HTTP_STATUS.OK)
        cy.validateResponseTime(response, RESPONSE_TIME_LIMIT)
        expect(body).to.be.an('array')
        expect(body.length).to.be.greaterThan(0)
      })
    })

    it('Deve validar o schema de cada comentário', () => {
      cy.request('GET', `${Cypress.env('apiUrl')}${API_ENDPOINTS.postComments(1)}`).then(response => {
        const { body } = response

        expect(validateArraySchema(body, fixtureData.commentSchema)).to.be.true
      })
    })

    it('Deve retornar array vazio para post sem comentários', () => {
      cy.request('GET', `${Cypress.env('apiUrl')}${API_ENDPOINTS.postComments(99999)}`).then(response => {
        expect(response.body).to.be.an('array').and.to.have.lengthOf(0)
      })
    })
  })

  context('GET /comments?postId=:id - Filtrar comentários por postId', () => {
    it('Deve retornar comentários filtrados por postId com status 200', () => {
      cy.request('GET', `${Cypress.env('apiUrl')}${API_ENDPOINTS.comments}?postId=1`).then(response => {
        const { status, body } = response

        cy.validateStatusCode(response, HTTP_STATUS.OK)
        cy.validateResponseTime(response, RESPONSE_TIME_LIMIT)
        expect(body).to.be.an('array')
        body.forEach(comment => {
          expect(comment.postId).to.equal(1)
        })
      })
    })

    it('Deve validar o schema dos comentários filtrados', () => {
      cy.request('GET', `${Cypress.env('apiUrl')}${API_ENDPOINTS.comments}?postId=1`).then(response => {
        const { body } = response

        expect(validateArraySchema(body, fixtureData.commentSchema)).to.be.true
      })
    })
  })

  context('POST /posts - Criar novo post', () => {
    it('Deve criar um novo post com status 201', () => {
      cy.request('POST', `${Cypress.env('apiUrl')}${API_ENDPOINTS.posts}`, fixtureData.newPost).then(response => {
        const { id, title, body, userId } = response.body

        cy.validateStatusCode(response, HTTP_STATUS.CREATED)
        cy.validateResponseTime(response, RESPONSE_TIME_LIMIT)
        expect(id).to.exist
        expect(title).to.equal(fixtureData.newPost.title)
        expect(body).to.equal(fixtureData.newPost.body)
        expect(userId).to.equal(fixtureData.newPost.userId)
      })
    })

    it('Deve retornar um novo post com ID gerado', () => {
      cy.request('POST', `${Cypress.env('apiUrl')}${API_ENDPOINTS.posts}`, fixtureData.newPost).then(response => {
        const { id } = response.body

        expect(id).to.be.a('number')
        expect(id).to.be.greaterThan(0)
      })
    })
  })

  context('PUT /posts/:id - Atualizar post completo', () => {
    it('Deve atualizar um post completo com status 200', () => {
      cy.request('PUT', `${Cypress.env('apiUrl')}${API_ENDPOINTS.postById(1)}`, fixtureData.updatedPost).then(response => {
        const { id, title, body, userId } = response.body

        cy.validateStatusCode(response, HTTP_STATUS.OK)
        cy.validateResponseTime(response, RESPONSE_TIME_LIMIT)
        expect(id).to.equal(fixtureData.updatedPost.id)
        expect(title).to.equal(fixtureData.updatedPost.title)
        expect(body).to.equal(fixtureData.updatedPost.body)
        expect(userId).to.equal(fixtureData.updatedPost.userId)
      })
    })

    it('Deve validar o schema do post atualizado', () => {
      cy.request('PUT', `${Cypress.env('apiUrl')}${API_ENDPOINTS.postById(1)}`, fixtureData.updatedPost).then(response => {
        expect(validateSchema(response.body, fixtureData.postSchema)).to.be.true
      })
    })
  })

  context('PATCH /posts/:id - Atualizar post parcialmente', () => {
    it('Deve atualizar parcialmente um post com status 200', () => {
      cy.request('PATCH', `${Cypress.env('apiUrl')}${API_ENDPOINTS.postById(1)}`, fixtureData.patchPost).then(response => {
        const { id, title } = response.body

        cy.validateStatusCode(response, HTTP_STATUS.OK)
        cy.validateResponseTime(response, RESPONSE_TIME_LIMIT)
        expect(id).to.equal(1)
        expect(title).to.equal(fixtureData.patchPost.title)
      })
    })

    it('Deve manter propriedades não alteradas no PATCH', () => {
      cy.request('PATCH', `${Cypress.env('apiUrl')}${API_ENDPOINTS.postById(1)}`, fixtureData.patchPost).then(response => {
        const { body, userId } = response.body

        expect(body).to.exist
        expect(userId).to.exist
      })
    })
  })

  context('DELETE /posts/:id - Deletar post', () => {
    it('Deve deletar um post com status 200', () => {
      cy.request('DELETE', `${Cypress.env('apiUrl')}${API_ENDPOINTS.postById(1)}`).then(response => {
        cy.validateStatusCode(response, HTTP_STATUS.OK)
        cy.validateResponseTime(response, RESPONSE_TIME_LIMIT)
      })
    })

    it('Deve retornar um objeto vazio na deleção', () => {
      cy.request('DELETE', `${Cypress.env('apiUrl')}${API_ENDPOINTS.postById(1)}`).then(response => {
        expect(response.body).to.be.an('object')
      })
    })
  })
})