const mongoose = require('mongoose');
const vendor_test_suite = require('./models/vendor_test');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/vendor_test', { useMongoClient: true });

mongoose.connection
    .once('open', () => {
        console.log('good to go');
    })
    .on('error', errorMsg => {
        console.warn('error occured:', errorMsg);
    });

// beforeEach(done => {
//     mongoose.connection.collections.vendors,
//     drop(() => {
//         done();
//     });
// });

describe('start test', () => {
    it('vendor test suite', done => {
        vendor_test_suite();
        done();
    });
});
