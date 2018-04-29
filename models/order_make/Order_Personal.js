const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MealSchema = require('../Meal');


const Order_Personal = new Schema({

    orderer_name:String, 
    order_meal:[MealSchema],

});


//const Order_PersonalSchema = mongoose.model('order_personal',Order_Personal);

module.exports  = Order_Personal;