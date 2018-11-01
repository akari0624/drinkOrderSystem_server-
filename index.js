const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const CONFIG = require('./conf/generalServerConfig');
const SERVER_INIT_modal = require('./index_modal');

const app = express();

console.log('NODE_ENV', process.env.NODE_ENV);

app.use(morgan('combined')); // set the logger

app.use(cors());
app.use(express.static(path.join(__dirname, '/public')));

app.disable('x-powered-by'); // 不透露我們是用什麼server  container資訊給 client瀏覽器知道

// setup bodyParser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({extended: true}));





app.listen(CONFIG.PORT, () => {

    // express啟動成功後才連線mongoDB
    SERVER_INIT_modal.oneExpressInitSuccess(CONFIG.PORT, app);

});
