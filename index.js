const express = require('express');
const router = require('./router');
const morgan = require('morgan');
const mongoose = require('mongoose');   // mongoDB 連線控制 & ORM層
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const PORT = 8089;
const app = express();

// map global Promise - get rid of warning
mongoose.Promise = global.Promise;

// mongoDB 預設走port 27017          //drink_order_system 就是local mongoDB 裡的database name  有就連,沒有就創出來(超隨性ㄉ) 
mongoose.connect('mongodb://localhost:27017/drink_order_system',{useMongoClient:true});


app.use(morgan('combined'));   // set the logger


app.use(cors());
app.use(express.static(path.join(__dirname,'/public')));

app.disable('x-powered-by');  // 不透露我們是用什麼server  container資訊給 client瀏覽器知道
// app.use(bodyParser.json({type:'*/*'}));

app.use(bodyParser({extended:false}));




router(app);


app.listen(PORT,
    ()=>console.log(`server is loadup on port:${PORT}`));


