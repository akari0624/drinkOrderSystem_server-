const Vendor = require('./Vendor');
const Meal = require('./Meal');

function responseDefinitelyError(res) {
    res.json({ errorMsg: '故意丟回絕對的錯誤訊息', successMsg: '' });
}

exports.save_one_Vendor = function(req, res, next) {

    const vendorImgDirectoryName = 'vendorMenuImg_fileArr';
    const {vendorName:vendor_name, vendorAddreass: vendor_addreass, vendorTel:vendor_tel} = JSON.parse(req.body.vendorData);
    const mealArr = JSON.parse(req.body.mealArr);


    const mealArrForSave = [];
    for (let i = 0; i < mealArr.length; i += 1) {
        const mealObj = mealArr[i];

        const name = mealObj.mealName;
        const price = mealObj.unitPrice;

        console.log(name, price);

        mealArrForSave.push({ name: name, unitPrice: price });
    }

    const uploadedImgsDatas = Array.from(req.files);
    const vendorImageArr = [];

    uploadedImgsDatas.forEach(data => {
        vendorImageArr.push(`${vendorImgDirectoryName}/${data.filename}`);
    });

    const vendor = new Vendor({
        vendor_name,
        vendor_addreass,
        vendor_tel,
        meals: mealArrForSave,
        menuImageString: vendorImageArr
    });

    vendor
        .save()
        .then(() => {
            const successMsg = `新增${mealArr.length}筆餐點資料 ,成功！`;
            res.json({ errorMsg: '', successMsg: successMsg });
        })
        .catch(errMsg => {
            res.json({ errorMsg: errMsg.toString(), successMsg: '' });
        });
};

exports.get_VendorInfo = function(req, res, next) {
    const id = req.params.id;

    if (id === 'all') {
        Vendor.find().exec()
            .then(vendors => {
                res.json({errorMsg:'',vendorData:vendors});
            })
            .catch(err => res.json({errorMsg:err,vendorData:[]}));
    }
};
