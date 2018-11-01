const VendorService = require('../../models/VendorService');

const UploadImg = require('../../middleware/multerFileUploadMiddleware');

const JWTAuthMiddleware = require('../../middleware/jwtStrategyAuthMiddleware');

module.exports = (app) => {


    app.post('/vendor/meal/initlist', JWTAuthMiddleware.requireJWTAuth , UploadImg, VendorService.save_one_Vendor);

    app.post('/vendor/retrieve/:id', JWTAuthMiddleware.requireJWTAuth, VendorService.get_VendorInfo);


};