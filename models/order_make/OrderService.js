const OrderModel = require('./Order');
const VendorModel = require('../Vendor');
const PersonalOrderMealModel = require('./PersonalOrderMeal');
const OrderDao = require('./OrderDao');


const toJsonResponserMiddleWare = (req,result,next) => {

    req.result = result;
    next();

};

exports.Insert_Init_Order = (req, res, next) => {
    const vendorId = req.body.vendorId;
    const coda = req.body.coda;
    const customMessage = req.body.customMessage;

    console.log(`received : ${vendorId}, ${coda}, ${customMessage}`);

    const initOrder = new OrderModel({vendor_id: vendorId, coda: coda, customMessage: customMessage, isEnd: false});

    const pResult = OrderDao.insert_Init_Order(initOrder);

    pResult.then( r =>  toJsonResponserMiddleWare(req,r,next));

};

exports.get_joinOrder_initInfo = (req, res, next) => {

    const orderId = req.body.orderId;
    console.log('orderId :', orderId);

    const pResult = OrderDao.get_joinOrder_initInfo(orderId);

    pResult.then( r =>  toJsonResponserMiddleWare(req,r,next) );
};

exports.addMealToOrder = (req, res, next) => {

    const orderInfo = req.body.orderInfo;
    const {orderId} = orderInfo;
    console.log('orderId :', orderId);

    const orderedMeal = new PersonalOrderMealModel({
        ...orderInfo
    });

    const pResult = OrderDao.addMealToOrder(orderedMeal, orderId);

    pResult.then( r =>  toJsonResponserMiddleWare(req,r,next));
  
};