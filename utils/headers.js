const headers = {
  'Access-Control-Request-Headers':
    'Content-type, Authorization, Content-Length, X-Requested-With',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Request-Method': 'PATCH, POST, GET, OPTIONS, DELETE',
  'Content-type': 'application/json',
};

module.exports = headers;
