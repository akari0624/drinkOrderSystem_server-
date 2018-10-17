
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SizeAndPriceSchema = new Schema({

    size:String,
    price:String
});

                               /*don't use arrow function here! */ 
SizeAndPriceSchema.pre('save', function(next){

    console.log('SizeAndPrice', this);
    const parseResult = parseInt(this.price, 10);

    console.log('parse price:',parseResult, this.price);
    console.log(typeof parseResult);

    if(isNaN(parseResult)){
        return next('價格必須為數字型態！');
    }

    next(); 

});




module.exports = SizeAndPriceSchema;