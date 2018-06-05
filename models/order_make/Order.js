const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const OrderSchema = new Schema({
    vendor_id:String,
    coda:{type:Number,default:0},
    customMessage:{type:String,default:''},
    isEnd:{type:Boolean,default:false},
    orders:{type:[String],default:[]},
    date:{type:Date,default:Date.now()}
},{ usePushEach: true });  // https://github.com/Automattic/mongoose/issues/5574



OrderSchema.pre('save',(next)=>{

    const order = this;
    if(order.vendor_id === ''){
        return next(new Error('vendor_id不應該是空白'));
    }

    next();
});


const Order = mongoose.model('order',OrderSchema);

module.exports  = Order;