// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('requestAPI', (method, endpoint, options = {}) => {
  const apiUrl = Cypress.env('apiUrl')
  const url = `${apiUrl}${endpoint}`

  return cy.request({
    method,
    url,
    failOnStatusCode: false,
    ...options
  })
})

Cypress.Commands.add('validateResponseTime', (response, maxTime = 500) => {
  expect(response.duration).to.be.lessThan(maxTime)
})

Cypress.Commands.add('validateStatusCode', (response, expectedStatus) => {
  expect(response.status).to.equal(expectedStatus)
})