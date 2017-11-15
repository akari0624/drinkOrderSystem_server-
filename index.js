const express = require('express');
const router = require('./router');
const morgan = require('morgan');
const mongoose = require('mongoose');   // mongoDB 連線控制 & ORM層
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = 8089;
const app = express();

// mongoDB 預設走port 27017          //drink_order_system 就是local mongoDB 裡的database name  有就連,沒有就創出來(超隨性ㄉ) 
mongoose.connect('mongodb://localhost/drink_order_system',{useMongoClient:true});


app.use(morgan('combined'));   // set the logger


app.use(cors());
app.use(bodyParser.json({type:'*/*'}));


router(app);


app.listen(PORT);


console.log(`server is loadup on port:${PORT}`);