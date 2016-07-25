const server = require('./server');

const PORT = 8000;

// server.listen(PORT, '192.168.1.2', function () {
//     console.log(`Escutando na porta ${PORT}.`);
// });

server.listen(PORT, function () {
    console.log(`Escutando na porta ${PORT}.`);
});
