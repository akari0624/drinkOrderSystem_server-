
const wrapPromiseErrToErrorMsg = (promiseErr) => {

    return {
        errorMsg:promiseErr
    };

};


module.exports = {
    wrapPromiseErrToErrorMsg
};