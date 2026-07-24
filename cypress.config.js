const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://jsonplaceholder.typicode.com', // URL base para as requisições da API
    responseTimeout: 10000, // URL base para as requisições da API
    requestTimeout: 10000, // se a API demorar mais de 10 segundos para responder, o teste falhará
    setupNodeEvents(on, config) {
      // node event listeners here
    },
    env: {
      apiUrl: 'https://jsonplaceholder.typicode.com'  // Facilidade caso precise rodar em outro ambiente
    },
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/reports/mochawesome-report',
      overwrite: false,
      html: true,
      json: true
    } // Configuração do Mochawesome para gerar relatórios de teste em formato HTML e JSON
  }
})