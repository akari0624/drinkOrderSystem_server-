const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Order = require('./Order');
const Vendor = require('../Vendor');

const PersonalOrderMealSchema = new Schema({

    orderId: {
        type: String,
        required: true
    },
    orderer_name: {
        type: String,
        default: 'this user did not leave a name'
    },
    orderer_userID: {
        type: String,
        required: true
    },
    mealId:{
        type:String,
        required:true
    },
    ordered_mealName: String,
    vendorId: {
        type: String,
        required: true
    },
    order_mealUnitPrice: Number,
    size_selected: String,
    quantity: Number,
    subTotal: Number
});

const findIsThesePriceAndSizeAndMealNameExistInTheMealOfThisVendor = (vendorData, personalOrderObj) => {

    const mealsArr = vendorData.meals;

    let isMealNameSameFlag = false;
    let isPriceAndSizeSameFlag = false;

    for (const meal of mealsArr) {

        if (meal.name === personalOrderObj.ordered_mealName) {
            isMealNameSameFlag = true;
            const unitPriceArr = meal.unitPrice;

            for (const p of unitPriceArr) {
                if (p.size === personalOrderObj.size_selected && p.price === personalOrderObj.order_mealUnitPrice.toString()) {
                    isPriceAndSizeSameFlag = true;
                    break;
                }
            }
        }

        if (isPriceAndSizeSameFlag) {
            break;
        }
    }

    if (isMealNameSameFlag && isPriceAndSizeSameFlag) {
        return true;
    } else {
        return false;
    }
};

const countIsTotalPriceCorrect = (unitPrice, quantity, subTotal) => {

    const caculateTotalPrice = parseInt(unitPrice, 10) * parseInt(quantity, 10);

    return caculateTotalPrice === parseInt(subTotal, 10);
};


PersonalOrderMealSchema.pre('save', async function (next) {

    const that = this;
    try {
        const order = await Order
            .findOne({_id: this.orderId})
            .exec();

        console.log('order', order);

        if (!order) {
            return next(new Error('the order is not exist!'));
        }

        const vendorData = await Vendor
            .findOne({_id: this.vendorId})
            .exec();

        if (!findIsThesePriceAndSizeAndMealNameExistInTheMealOfThisVendor(vendorData, that)) {

            return next(new Error('這個餐點名稱或是價格或是尺寸，不存在！！'));
        }

        const {order_mealUnitPrice, quantity, subTotal} = that;
        if (!countIsTotalPriceCorrect(order_mealUnitPrice, quantity, subTotal)) {
            return next(new Error('請勿嘗試自行修改訂購小計計算結果'));
        }

        next();
    } catch (err) {
        next(err);
    }

});

const PersonalOrderMealModel = mongoose.model('personal_order_meals', PersonalOrderMealSchema);

module.exports = PersonalOrderMealModel;