class Client {
    constructor(id, conn) {
        this.id = id;
        this.conn = conn;
        this.room = null;  // 這個連線是在哪個room裡
    }
}


module.exports =  Client;
