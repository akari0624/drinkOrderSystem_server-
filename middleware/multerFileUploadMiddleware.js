const path = require('path');
const multer = require('multer');



var storage = multer.diskStorage({

    // __dirname 代表這個檔案的絕對路徑 , 第二個參數的  "../"  代表往上找一層 , 再進入這一層的  "public/vendorMenuImg_fileArr" 底下
    destination: path.join(__dirname,'../','/public/vendorMenuImg_fileArr'),
    
    filename: function(req, file, cb) { 

 
    console.log('theFile',file);
    
    // 上傳到資料夾裡後，存檔的檔名想要 變什麼樣子，這裡是簡單地用timestamp做一下
    var fileFormat = (file.originalname).split(".");
    cb(null, file.fieldname + '-' + Date.now() + '.' + (fileFormat[fileFormat.length - 1]));

} });


const uploadImg = multer({

    storage: storage

});

    // .array代表預設上傳上來的formdata裡會有多個檔案，如果給 第二個數字參數 代表讓multer幫你檢查一次最多可同時上傳的檔案數量
// module.exports = uploadImg.array('menuImg_fileArr',3);

module.exports = uploadImg.array('menuImg_fileArr');

