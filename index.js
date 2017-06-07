const server = require('./server');

// server.listen(PORT, '192.168.1.2', function () {
//     console.log(`Escutando na porta ${PORT}.`);
// });

server.listen(process.env.PORT, function () {
    console.log(`Escutando na porta ${process.env.PORT}.`);
});
