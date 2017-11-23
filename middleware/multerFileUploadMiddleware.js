const path = require('path');
const multer = require('multer');



var storage = multer.diskStorage({

    // __dirname 代表這個檔案的絕對路徑 , 第二個參數的  "../"  代表往上找一層 , 再進入這一層的  "public/vendorMenuImg_fileArr" 底下
    destination: path.join(__dirname,'../','/public/vendorMenuImg_fileArr'),
    
    filename: function(req, file, cb) { 

 
    console.log('theFile',file);
    var fileFormat = (file.originalname).split(".");
    cb(null, file.fieldname + '-' + Date.now() + '.' + (fileFormat[fileFormat.length - 1]));

} });


const uploadImg = multer({

    storage: storage

});

// module.exports = uploadImg.array('menuImg_fileArr',3);

module.exports = uploadImg.array('menuImg_fileArr');

