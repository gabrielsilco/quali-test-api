const restify = require('restify');
const routes = require('./routes')

const server = restify.createServer();

server.use(restify.plugins.bodyParser());

routes(server);

const port = 3000;
server.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
