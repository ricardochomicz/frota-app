// import WebSocket from 'ws';

// const wss = new WebSocket.Server({ port: 5000 }); // WebSocket na porta 5002

// wss.on('connection', (ws) => {
//     console.log('Novo cliente conectado!');

//     // Enviar uma mensagem quando a conexão for estabelecida
//     ws.send('Conexão WebSocket estabelecida com sucesso!');

//     // Quando o servidor recebe uma mensagem do cliente
//     ws.on('message', (message) => {
//         console.log('Mensagem recebida do cliente:', message);
//     });

//     // Quando o cliente desconectar
//     ws.on('close', () => {
//         console.log('Cliente desconectado');
//     });

//     // Tratamento de erros
//     ws.on('error', (error) => {
//         console.error('Erro no WebSocket:', error);
//     });
// });

// console.log('Servidor WebSocket rodando na porta 5002...');
