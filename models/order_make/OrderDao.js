const Order = require('./Order');
const VendorModel = require('../Vendor');

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

        const orderData = await Order.findOne({_id: orderId});

        const {vendor_id: _id} = orderData;
        const vendorData = await VendorModel.findOne({_id});

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
        errorMsg: ''
    };
    try {

        const savedOrderedMeal = await personalOrderMealModel.save();

        const {_id: savedOrderMealId} = savedOrderedMeal;
        const orderModel = await Order
            .findById(orderId)
            .exec();

        orderModel
            .orders
            .push(savedOrderMealId);

        await orderModel.save();

        return result;
    } catch (e) {
        console.log('in catch');
        result.errorMsg = `新增個人訂購餐點紀錄時發生錯誤！！${e}`;

        console.log('the result', result);
        return result;
    }

};

const OrderDao = {
    insert_Init_Order,
    get_joinOrder_initInfo,
    addMealToOrder
};

module.exports = OrderDao;