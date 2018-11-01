const jsonResponserMiddleware = require('../../middleware/jsonResponserFinalMiddleware');
const JWTAuthMiddleware = require('../../middleware/jwtStrategyAuthMiddleware');
const UserService = require('../../models/users/UserService');

module.exports = app => {

    app.post('/user/getinfo_by_oauth_id', JWTAuthMiddleware.requireJWTAuth, UserService.getUserDataByOAuthID, jsonResponserMiddleware);
    

};