const server = require('./server');

const PORT = 3500;

// server.listen(PORT, '192.168.10.125', function () {
//     console.log(`Escutando na porta ${PORT}.`);
// });

server.listen(PORT, function () {
    console.log(`Escutando na porta ${PORT}.`);
});
