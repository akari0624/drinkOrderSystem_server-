const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SizeAndPrice = require('./SizeAndPrice');

const MealSchema = new Schema({
    shopId: Number,
    name: { type: String, unique: false },
    unitPrice: [SizeAndPrice],
    comment: String
});

const isNotCompletePriceArr = priceArr => {
    if (priceArr.length > 1) {
        const resultArr = priceArr.filter(p => {
            if (!p.size || !p.price) {
                return p;
            }
        });

        if (resultArr.length > 0) {
            return false;
        }
    } else if (priceArr.length === 1) {
        if (!priceArr[0].price) {
            return false;
        }
    }
    return true;
};

MealSchema.pre('save', function(next) {
    const meal = this;
    if (meal.name === '') {
        return next('餐點名稱不可為空白！');
    }

    if (meal.unitPrice.length === 0) {
        return next('餐點不可以沒有價格');
    }

    if (!isNotCompletePriceArr(meal.unitPrice)) {
        return next('餐點如果有分尺寸，每種尺寸都必須有價格');
    }

    next();
});

// const ModelClass = mongoose.model('meal',MealSchema);

//module.exports = ModelClass;

module.exports = MealSchema;
