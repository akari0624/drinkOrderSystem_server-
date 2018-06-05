const VendorModel = require('../../models/Vendor');




exports.insertOneVendorAndRetrieve_id = async (mockVendorDataObj) => {

    try{
        const fakeVendor = new VendorModel(mockVendorDataObj);

        const savedVendor = await fakeVendor.save();

        return savedVendor._id;

    }catch(err){

        console.log(err);
        throw new Error(err);  //make program stop
       
    }

};



// exports.insertOneMockOrder = async () => {




    
// };