const WebSocket = require('ws');
const Client = require('./models/ws/Client');
const ChatRoom = require('./models/ws/ChatRoom');



const WebSocketServer = WebSocket.Server;
const wsPort = 8090;
const server = new WebSocketServer({ port: wsPort });


console.log(`webSocket server is up on port:${wsPort}`);

const generateUniqueClientId = (
    len = 6,
    chars = 'abcdefghjkmnopqrstuvwxyz01234567890'
) => {
    let id = '';

    while (len--) {
        id += chars[Math.random() * chars.length || 0];
    }
    return id;
};



const chatRooms = new Map();

const isThisRoomEstablished = orderId => {
    return chatRooms.has(orderId);
};

// 每個ws連線進來時這個func都會被invoke，
server.on('connection', conn => {
    console.log('ws connection established');

    // 在這裡把當前進來的連線keep起來，轉化成 Client類別物件
    let newClient = new Client(generateUniqueClientId(), conn);  

    // 底下就是closure，因為裡面存取了outter function裡的 newClient，
    // 所以new Client指向的記憶體位置不會被GC
    conn.on('message', msg => {
        console.log('msg received', msg);
        const pMsg = JSON.parse(msg);

        const type = pMsg.type;
        const orderId = pMsg.orderId;

        if (type === 'isRoomExist') {
            if (!isThisRoomEstablished(orderId)) {
                const room = new ChatRoom(orderId);

                room.join(newClient);

                chatRooms.set(orderId, room);
                console.log(`new chatRoom ${orderId} has been established`);
            } else {
                chatRooms.get(orderId).join(newClient);
                console.log('new comer join room' + orderId);
            }
        }else if(type === 'sending-message'){
            const chatRoom = chatRooms.get(orderId);
            chatRoom.broadcastMessage(pMsg.message);
        }
    });

    conn.on('close', () => {

        const room = newClient.room;
        if(room){
            room.leave(newClient);

            newClient = null;  //把 newClient重指去null,讓原本的記憶體位置不再有指標指向它，它就能被排進GC隊列裡
        }
        if(room.clients.size===0){
            chatRooms.delete(room.roomId);
            console.log(`no one in room ${room.roomId}, this room has been delete`);
        }
        
    });
});
