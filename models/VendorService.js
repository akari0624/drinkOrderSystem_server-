const Vendor = require('./Vendor');
const Meal = require('./Meal');

function responseDefinitelyError(res) {
    res.json({ errorMsg: '故意丟回絕對的錯誤訊息', successMsg: '' });
}

exports.save_one_Vendor = function(req, res, next) {

    const vendorImgDirectoryName = 'vendorMenuImg_fileArr';
    const mealArr = JSON.parse(req.body.mealArr);

    //  responseDefinitelyError(res);
    //  return;

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
        vendor_name: '茶的魔手',
        vendor_addreass: '高雄市XX區ＯＯ路',
        vendor_tel: '091122334455',
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
            res.json({ errorMsg: errMsg, successMsg: '' });
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
