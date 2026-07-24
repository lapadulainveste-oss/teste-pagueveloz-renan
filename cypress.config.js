const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://jsonplaceholder.typicode.com', // URL base para as requisições da API
    responseTimeout: 10000, // se a API demorar mais de 10 segundos para responder, o teste falhará
    requestTimeout: 10000, // se a requisição demorar mais de 10 segundos para ser concluída, o teste falhará
    setupNodeEvents(on, config) {
      // node event listeners here
    },
    env: {
      apiUrl: 'https://jsonplaceholder.typicode.com'
    }
  }
})