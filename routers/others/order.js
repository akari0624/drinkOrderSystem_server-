const JWTAuthMiddleware = require('../../middleware/jwtStrategyAuthMiddleware');

const OrderService = require('../../models/order_make/OrderService');
const jsonResponserMiddleware = require('../../middleware/jsonResponserFinalMiddleware');

module.exports = app => {

    app.post('/order/create', JWTAuthMiddleware.requireJWTAuth, OrderService.Insert_Init_Order, jsonResponserMiddleware);

    app.post('/order/join/get_order_info', JWTAuthMiddleware.requireJWTAuth, OrderService.get_joinOrder_initInfo, jsonResponserMiddleware);

    app.post('/order/join/add_order_meal_to_order', JWTAuthMiddleware.requireJWTAuth, OrderService.addMealToOrder, jsonResponserMiddleware);

    app.post('/order/delete/delete_ordered_meal', JWTAuthMiddleware.requireJWTAuth, OrderService.deleteMealAndDeleteMealInOrderSubDocument, jsonResponserMiddleware);


};