const assert = require('assert');
const OrderDao = require('../../models/order_make/OrderDao');
const TestHelper = require('../utils/test_helper');
const MockData = require('../utils/mockdata');
const OrderModel = require('../../models/order_make/Order');

module.exports = () => {
    describe('order backend text', () => {

        it('test can insert order ', (done) => {


            const test = async () => {

                const mockVendorId = await TestHelper.insertOneVendorAndRetrieve_id();

                const initOrderData = MockData.getMockInitOrderData(mockVendorId);

                const mOrderModel = new OrderModel(initOrderData);

                const pInitOrder = await OrderDao.insert_Init_Order(mOrderModel);

                assert.equal(pInitOrder.errorMsg, '');

                assert.equal(pInitOrder.orderId !== '', true);

               
            };

            try {
                test();
                done();
            } catch (err) {
                console.log(err);
                done();
            }

        });

    });

};