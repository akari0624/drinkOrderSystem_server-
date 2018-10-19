
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MealSchema = require('./Meal');


const VendorSchema = new Schema({

    vendor_name:String,
    vendor_addreass:String,
    vendor_tel:String,
    meals:[MealSchema],
    menuImageString:[String]
});


const Vendor = mongoose.model('vendor',VendorSchema);

module.exports  = Vendor;