const server = require('./server');

server.listen(process.env.PORT, function () {
    console.log(`Escutando na porta ${process.env.PORT}.`);
});
