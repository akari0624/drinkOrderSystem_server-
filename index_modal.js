const mongoURL = require('./conf/mongoURL'); 

exports.oneExpressInitSuccess = (PORT, expressAppRef) => {

    const mongoose = require('mongoose'); // mongoDB 連線控制 & ORM層

    // map global Promise - get rid of warning
    mongoose.Promise = global.Promise;

    // mongoDB 預設走port 27017          //drink_order_system 就是local mongoDB
    // 裡的database name  有就連,沒有就創出來(超隨性ㄉ)

    /** mongoose 4.3.17 syntax
      mongoose.connect('mongodb://localhost:27017/drink_order_system',{useMongoClient:true});
   */

    /**
   * mongose 5.3.4 syntax
   */
    mongoose.connect(mongoURL.MONGODB_URL, {
        useCreateIndex: true,
        useNewUrlParser: true
    });

    const db = mongoose.connection;

    db.on('error', err => console.error(err));

    db.once('open', () => {

        // start to binding router
        require('./routers')(expressAppRef);
        console.log(`server is loadup successful and start to listen port:${PORT}`);

    });

};