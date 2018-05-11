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

// beforeEach(cb)   => before every `it`

// beforeEach(() => {
//     mongoose.connection.collections.vendors.drop(err => {
//         console.log(err);
//         console.log('collection dropped');
//     });
// });

describe('start test', () => {
    it('vendor test suite', done => {
        vendor_test_suite();
        done();
    });
});

// after(cb) => after all the `it`
after(done => {
    mongoose.connection.collections.vendors
        .drop()
        .then(() => {
            console.log('collection vendors dropped');
            done();
        })
        .catch(err => {
            console.log('error occured while drop collection vendors!!', err);
            done();
        });
});
