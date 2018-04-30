const VendorService = require('./models/VendorService');

const UploadImg = require('./middleware/multerFileUploadMiddleware');
const OrderService = require('./models/order_make/OrderService');

module.exports = function(app) {
    // 在router.js 裡直接套用 multerFileUploadMiddleware , 就是這樣寫
    // VendorDAO 那邊不用管 file, files 怎麼來，用就對了
    // 完全看不到 middleware裡對res做了些什麼,不知道是怎麼做的...非常厲害  = =
    app.post('/vendor/meal/initlist', UploadImg, VendorService.save_one_Vendor);

    app.post('/vendor/retrieve/:id', VendorService.get_VendorInfo);

    app.post('/order/create', OrderService.Insert_Init_Order);

    app.post('/order/join/get_order_info',OrderService.get_joinOrder_initInfo);
};
