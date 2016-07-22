const server = require('./server');

const PORT = 8000;

server.listen(PORT, function () {
    console.log(`Escutando na porta ${PORT}.`);
});
