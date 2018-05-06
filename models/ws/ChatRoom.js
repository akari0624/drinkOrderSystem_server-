class ChatRoom {
    constructor(orderId) {
        this.roomId = orderId;
        this.clients = new Set();  // 一個room有多個 client
    }

    join(client) {
        if (client.room) {
            throw new Error('this client already in one room!!');
        }

        this.clients.add(client);
        client.room = this;
    }

    broadcastMessage(msg) {
        this.clients.forEach(client => {
            // if (client.readyState === WebSocket.OPEN) {
            console.log('prepare to send:' + msg);
            client.conn.send(msg);
            // } else {
            //     console.log('state is not turn to OPEN');
            // }
        });
    }

    leave(client){

        if(client.room !== this){
            throw new Error('this client not in this room !!');
        }

        this.clients.delete(client);
        client.room = null;
    }
}

module.exports = ChatRoom;
