const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Order_PersonalSchema = require('./Order_Personal');


const OrderSchema = new Schema({

    vendor_id:String,
    coda:{type:Number,default:0},
    customMessage:{type:String,default:''},
    isEnd:{type:Boolean,default:false},
    orders:{type:[Order_PersonalSchema],default:[]},
    date:{type:Date,default:Date.now()}
});



OrderSchema.pre('save',(next)=>{

    const order = this;
    if(order.vendor_id === ''){
        return next('vendor_id不應該是空白');
    }

    next();
});


const Order = mongoose.model('order',OrderSchema);

module.exports  = Order;