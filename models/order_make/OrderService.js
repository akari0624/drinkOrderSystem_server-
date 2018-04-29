const Order = require('./Order');

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

    initOrder.save().then(() => {
        res.json({
            errorMsg: '',
            orderId: initOrder._id
        });
    }).catch(e => {

        res.json({
            errorMsg: e,
            orderId: ''
        });

    });

};
