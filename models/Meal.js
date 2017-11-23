const mongoose =  require('mongoose');
const Schema = mongoose.Schema;


const MealSchema = new Schema ({
 
    shopId:Number,
    name:{type:String,unique:false},
    price:Number,
    comment:String

});

MealSchema.pre('save',function(next){

    const meal = this;
     if(meal.name === ''){

        return next('餐點名稱不可為空白！');
     }


     next();
});


// const ModelClass = mongoose.model('meal',MealSchema);


//module.exports = ModelClass;


module.exports = MealSchema