// Conectar ao servidor WebSocket
const socket = new WebSocket('ws://localhost:5000');

// Quando a conexão for aberta
socket.onopen = () => {
    console.log('Conexão WebSocket estabelecida');
    // Enviar uma mensagem ao servidor, se necessário
    socket.send('Olá, servidor!');
};

// Quando uma mensagem for recebida do servidor
socket.onmessage = (event) => {
    console.log('Mensagem recebida do servidor:', event.data);
    // Exibir notificação ou atualizar a interface com a mensagem
    alert(event.data);
};

// Quando ocorrer um erro
socket.onerror = (error) => {
    console.error('Erro no WebSocket:', error);
};

// Quando o servidor desconectar
socket.onclose = () => {
    console.log('Conexão WebSocket fechada');
};
