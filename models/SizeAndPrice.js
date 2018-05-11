
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SizeAndPrice = new Schema({

    size:String,
    price:String
});


SizeAndPrice.pre('save', next => {

    const parseResult = parseInt(this.price,10);

    if(isNaN(parseResult)){
        return next('價格必須為數字型態！');
    }

    next(); 

});





module.exports = SizeAndPrice;