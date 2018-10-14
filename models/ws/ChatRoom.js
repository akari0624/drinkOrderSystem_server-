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

    broadcastChatMessage(msg, senderId) {
        this.clients.forEach(client => {
            // if (client.readyState === WebSocket.OPEN) {
            console.log('prepare to send chat:' + msg);

            const obj = {
                type:'braodcastChatMessage',
                senderId,
                msg,
            };
            client.conn.send(JSON.stringify(obj));
            // } else {
            //     console.log('state is not turn to OPEN');
            // }
        });
    }


    broadcastOrderInfoMessage(msg, senderId) {
        this.clients.forEach(client => {
            // if (client.readyState === WebSocket.OPEN) {
            

            const obj = {
                type:'braodcastOrderInfoMessage',
                senderId,
                msg,
            };
            const toSendJsonString = JSON.stringify(obj);
            console.log('prepare to send orderInfo:' + toSendJsonString);
            client.conn.send(toSendJsonString);
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
