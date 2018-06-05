const mockVendorDataObj = {
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
};


const getMockInitOrderData = (vendorId, coda, customMessage) => {

    return {vendor_id: vendorId, coda: coda, customMessage: customMessage, isEnd: false};
};


const MockData = {
    mockVendorDataObj,
    getMockInitOrderData,
};

module.exports = MockData;