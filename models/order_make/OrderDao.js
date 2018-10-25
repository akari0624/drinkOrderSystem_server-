const mongoose = require('mongoose');
const Order = require('./Order');
const VendorModel = require('../Vendor');
const PersonalOrderMealModel = require('./PersonalOrderMeal');

const insert_Init_Order = async(initOrderModel) => {

    const result = {
        errorMsg: '',
        orderId: ''
    };

    try {
        const savedInitOrder = await initOrderModel.save();
        result.orderId = savedInitOrder._id;
        return result;

    } catch (err) {

        result.errorMsg = `建立初始訂單時發生錯誤：${err}`;
        return result;
    }
};

const get_joinOrder_initInfo = async(orderId) => {

    const result = {
        errorMsg: '',
        joinOrderInfo: {
            orderInfo: null,
            vendorInfo: null
        }
    };

    try {

        const orderData = await Order
            .findOne({_id: orderId})
            .populate('orders');

        const {vendor_id} = orderData;
        const vendorData = await VendorModel.findOne({_id: vendor_id});

        result.joinOrderInfo.orderInfo = orderData;
        result.joinOrderInfo.vendorInfo = vendorData;

        return result;

    } catch (err) {
        result.errorMsg = `發生錯誤！！${err}`;
        result.joinOrderInfo = {};

        return result;
    }

};

const addMealToOrder = async(personalOrderMealModel, orderId) => {

    const result = {
        errorMsg: '',
        savedOrderMeal: {}
    };
    try {

        const savedOrderedMeal = await personalOrderMealModel.save();

        const {_id: savedOrderMealId} = savedOrderedMeal;
        const orderModel = await Order
            .findById(orderId)
            .exec();

        orderModel
            .orders
            .push(mongoose.Types.ObjectId(savedOrderMealId));

        await orderModel.save();

        result.savedOrderMeal = savedOrderedMeal;

        return result;
    } catch (e) {
        console.log('in catch');
        result.errorMsg = `新增個人訂購餐點紀錄時發生錯誤！！${e}`;

        console.log('the result', result);
        return result;
    }

};

/* 用personal_order_meals的_id 找多個 personal_order_meals */
const findOrderedMealDetailsByID = async(orderedMealIDArr) => {

    const result = await PersonalOrderMealModel
        .find()
        .where('_id')
        . in(orderedMealIDArr)
        .exec();

    return result;

};

/* transaction only avaliable in replica set of mongoDB(主從分散支援覆寫的多個mongoDB), so this has no effect in this easy architecture app...) */
const deleteMealAndDeleteMealInOrderSubDocument = async(mealID, orderID) => {

    let session = null;
    try {
        const _session = await mongoose.startSession();
        session = _session;

        session.startTransaction();
        await PersonalOrderMealModel.deleteOne({_id:mealID}).session(session);

        await Order.orders.id(mongoose.Types.ObjectId(mealID)).remove().session(session);

        session.commitTransaction();

        return '';
    } catch (error) {

        return error;
    }
};

/* caution: not an acid transaction */
const deleteMealAndDeleteMealInOrderSubDocument2 = async(mealID, orderID) => {

    try {

        /* 刪掉orders collection 裡的subDocument orders裡的personal_order_meals的objectID */
        console.log(`prepare to remove subDoc in OrderModel.orders mealID:${mealID}, orderID:${orderID}`);
        const tOrder = await Order.findById(orderID);

        const  pulledID = await tOrder.orders.pull(mongoose.Types.ObjectId(mealID));

        console.log(pulledID);
        /* pull完之後要再call一次save 不然MongoDB端的資料不會變化 */
        const result = await tOrder.save();
        console.log(`delete over:${result}`);

        /* 刪掉PersonalOrderMealModel裡的detail資料 */
        await PersonalOrderMealModel.deleteOne({_id:mealID});

        return '';
    } catch (error) {
        console.error(error); 
        return error;
    }
};

const OrderDao = {
    insert_Init_Order,
    get_joinOrder_initInfo,
    addMealToOrder,
    deleteMealAndDeleteMealInOrderSubDocument2
};

module.exports = OrderDao;