const assert = require('assert');
const VendorModel = require('../../models/Vendor');



module.exports = () => {
    describe('sub-documents', () => {
        it('can produce sub-document - meals-price', done => {
            const chaNoMaTe = new VendorModel({
                vendor_name: '茶的魔手',
                vendor_addreass: '高雄市XX區ＯＯ路',
                vendor_tel: '091122334455',
                meals: [
                    { name: '紅茶', unitPrice: {size:null,price:'30'} },
                    { name: '綠茶', unitPrice: {size:null,price:'25'} },
                    { name: '烏龍茶', unitPrice: {size:null,price:'40'} }
                ],
                menuImageString: [
                    '/usr/Morris/node/img/XXXX.png',
                    '/usr/Morris/node/img/1111.png',
                    '/usr/Morris/node/img/2222.png'
                ]
            });

            chaNoMaTe.save().then(() => {
                VendorModel.findOne({ vendor_name: '茶的魔手' }).then(
                    tVendor => {
                        assert(tVendor.meals[0].name === '紅茶');
                        assert(tVendor.meals[0].unitPrice[0].price === '30');
                        done(); // handle async operation
                    }
                ).catch(err => {console.log(err); done(err);});
            }).catch(err => {console.log(err); done(err);});
        });

        it('can retrieve all vendors', done => {
            VendorModel.find()
                .exec()
                .then(vendors => {
                    assert(vendors.length > 0);

                    done();
                })
                .catch(err => {
                    console.log(err);
                    done(err);
                });
        });

        it('test find', done => {
            VendorModel.find({'meals.name':'紅茶'})
                .select('meals')
                .then(result => {
                    console.log('meals', result);
                    assert(result[0].meals[0].name === '紅茶');
                    assert(result[0].meals[0].unitPrice[0].price === '30');
                    assert(result[0].meals[0].unitPrice[0].size === null);
                    //assert(meals.length === 5);

                    done();
                }).catch(err => {
                    console.log(err);
                    done(err);
                });
        });
    });
};
