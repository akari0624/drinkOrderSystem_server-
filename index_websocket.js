const WebSocket = require('ws');
const WebSocketServer = WebSocket.Server;
const wsPort = 8090;
const server = new   WebSocketServer({port:wsPort});

console.log(`webSocket server is up on port:${wsPort}`);


const broadcastMessage = (server, msg) => {
    server.clients.forEach(client => {

        if(client.readyState === WebSocket.OPEN) {
            console.log('prepare to send:'+msg);
            client.send(msg);
        }else{
            console.log('state is not turn to OPEN');
        }
    });
};

server.on('connection', conn => {
    console.log('ws connection established');

    conn.on('message', msg =>{

        console.log(`received :${msg}`);

        broadcastMessage(server, msg);
    });

    conn.on('close', ()=>{

        console.log('ws connection closed');
    });

});












