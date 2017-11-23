
const vendorDAO = require('./models/VendorDAO');

const UploadImg = require('./middleware/multerFileUploadMiddleware');



module.exports = function(app) {

// 在router.js 裡直接套用 multerFileUploadMiddleware , 就是這樣寫
// VendorDAO 那邊不用管 file, files 怎麼來，用就對了
// 完全看不到 middleware裡對res做了些什麼,不知道是怎麼做的...非常厲害  = =  
  app.post("/vendor/meal/initlist", UploadImg, vendorDAO.save_one_Vendor);

 


}