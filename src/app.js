const restify = require('restify');
const cors = require('cors');

const routes = require('./routes');

const server = restify.createServer();

const corsOptions = {
  origin: 'http://localhost:8080',
  methods: 'GET, POST, PUT, DELETE, OPTIONS',
  allowedHeaders: 'Content-Type, Authorization',
};

server.use(restify.plugins.bodyParser());
server.use(cors(corsOptions))

server.opts('*', cors());
server.del('*', cors());

routes(server);

const port = 3000;
server.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
