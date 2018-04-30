const Order = require('./Order');
const VendorModel = require('../Vendor');

exports.Insert_Init_Order = (req, res, next) => {
    const vendorId = req.body.vendorId;
    const coda = req.body.coda;
    const customMessage = req.body.customMessage;

    console.log(`received : ${vendorId}, ${coda}, ${customMessage}`);

    const initOrder = new Order({
        vendor_id: vendorId,
        coda: coda,
        customMessage: customMessage,
        isEnd: false
    });

    initOrder
        .save()
        .then(() => {
            res.json({
                errorMsg: '',
                orderId: initOrder._id
            });
        })
        .catch(e => {
            res.json({
                errorMsg: e,
                orderId: ''
            });
        });
};



exports.get_joinOrder_initInfo = async (req, res, next) => {
    try {
        const orderId = await req.body.orderId;
        console.log('orderId :', orderId);

        const orderData = await Order.findOne({ _id: orderId });

        const vendorData = await VendorModel.findOne({
            _id: orderData.vendor_id
        });

        res.json({
            errorMsg: '',
            joinOrderInfo: {
                orderInfo: orderData,
                vendorInfo: vendorData
            }
        });
    } catch (e) {
        res.json(res.json({ errorMsg: '發生錯誤！！', joinOrderInfo: {} }));
    }
};
