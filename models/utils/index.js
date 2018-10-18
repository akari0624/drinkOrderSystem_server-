
const wrapErrorObjToErrorMsg = (promiseErr) => {

    return {
        errorMsg:promiseErr
    };

};

const toJsonResponserMiddleWare = (req,result,next) => {

    req.result = result;
    next();

};


module.exports = {
    wrapErrorObjToErrorMsg, toJsonResponserMiddleWare
};