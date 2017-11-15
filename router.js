const Meal = require("./models/Meal");

module.exports = function(app) {
//   app.get("/", function(req, res) {
//     const content = "main landingPage on 8089 with nodemon";
//     const testHTMLTemplate = `<!doctype html><html><body>${content}</body><html/>`;
//     res.send(testHTMLTemplate);
//   });

  app.post("/vendor/meal/initlist", function(req, res, next) {
    const mealArr = req.body.mealArr;

    console.log("router:", mealArr);
let errMsg = '';

      //  responseDefinitelyError(res); 
      //  return;

    for(let i=0;i<mealArr.length;i+=1){
        const mealObj = mealArr[i];
      const name = mealObj.mealName;
      const price = mealObj.unitPrice;

      // if (!name || !price) {

      //             return res.status(422).send({ errorMsg: '無資料' });

      //         }

      const meal = new Meal({ name: name, price: price });

      meal.save(function(err) {
        if (err) {
          

          errMsg += err+';';

  //        break;
        }
   
      });
    };

        if(errMsg !== ''){
            res.json({errorMsg: errMsg, successMsg: '' })
        }else{

        const successMsg = `新增${mealArr.length}筆餐點資料 ,成功！`;
        res.json({errorMsg: '', successMsg: successMsg });
        }
  });
};


function responseDefinitelyError(res){


    res.json({errorMsg: '故意丟回絕對的錯誤訊息', successMsg: '' });

}
