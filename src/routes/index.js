const pacientRoutes = require('./patients.js');

module.exports = (server) => {
    pacientRoutes(server);
};