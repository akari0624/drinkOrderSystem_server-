const assert = require('assert');
const VendorModel = require('../../models/Vendor');

describe('subdocuments',()=>{

 

    it('can produce sub-document',
    (done)=>{
    
    
        const chaNoMaTe = new VendorModel({
    
            vendor_name:'茶的魔手',
            vendor_addreass:'高雄市XX區ＯＯ路',
            vendor_tel:'091122334455',
            meals:[{name: '紅茶', price: 30 },{name: '綠茶', price: 25 },{name: '烏龍茶', price: 35 }],
            menuImageString:['/usr/Morris/node/img/XXXX.png','/usr/Morris/node/img/1111.png','/usr/Morris/node/img/2222.png']
    
    
        });
    
        chaNoMaTe.save().then(()=>{
    
            VendorModel.findOne({vendor_name:'茶的魔手'}).then((tVendor)=>{
    
                assert(tVendor.meals[0].name === '紅茶');
                assert(tVendor.meals[0].price === 30);
                done();   // handle async operation
            });
        })
    
    }
    );

    it('test find',(done)=>{
 
        VendorModel.find('meals').where('price').gte(30).then((meals)=>{

              assert(meals[0].name === '紅茶');
              assert(meals[0].price === 30);
              assert(meals.length === 5);

             done();
        });

    });


});

