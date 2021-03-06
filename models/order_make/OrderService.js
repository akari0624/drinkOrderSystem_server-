const OrderModel = require('./Order');
const VendorModel = require('../Vendor');
const PersonalOrderMealModel = require('./PersonalOrderMeal');
const OrderDao = require('./OrderDao');
const ToErrMsg = require('../utils').wrapErrorObjToErrorMsg;

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

    console.log('addMealToOrder, user:', req.user);

    const orderInfo = req.body.orderInfo;
    const {orderId} = orderInfo;
    console.log('orderId :', orderId);

    orderInfo.orderer_name = req.user.name;
    orderInfo.orderer_userID = req.user.userID;

    const orderedMeal = new PersonalOrderMealModel({
        ...orderInfo
    });

    const pResult = OrderDao.addMealToOrder(orderedMeal, orderId);

    pResult.then( r =>  toJsonResponserMiddleWare(req,r,next)).catch(

        err => toJsonResponserMiddleWare(req, ToErrMsg(err), next)
    );
  
};



exports.deleteMealAndDeleteMealInOrderSubDocument = (req, res, next) => {


    const mealInOrder = req.body.mealInOrder;
    const {mealID, orderID} = mealInOrder;
    console.log('mealId :', mealID);


    const pResult = OrderDao.deleteMealAndDeleteMealInOrderSubDocument2(mealID, orderID);

    pResult.then( r =>  toJsonResponserMiddleWare(req, ToErrMsg(r), next)).catch(

        err => toJsonResponserMiddleWare(req, ToErrMsg(err), next)
    );
  
};