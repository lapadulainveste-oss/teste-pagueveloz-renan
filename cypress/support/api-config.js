const API_ENDPOINTS = {
  posts: '/posts',
  postById: (id) => `/posts/${id}`,
  postComments: (id) => `/posts/${id}/comments`,
  comments: '/comments'
} // Objeto contendo os endpoints da API para facilitar a manutenção e evitar hardcoding de URLs

const API_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE'
} // Objeto contendo os métodos HTTP para facilitar a manutenção e evitar hardcoding de strings

const RESPONSE_TIME_LIMIT = 500

const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
} // Objeto contendo os códigos de status HTTP para facilitar a manutenção e evitar hardcoding de números

module.exports = {
  API_ENDPOINTS,
  API_METHODS,
  RESPONSE_TIME_LIMIT,
  HTTP_STATUS
}