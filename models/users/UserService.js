const UserDao = require('./UserDao');
const UserModel = require('./User');
const SIGNUPTYPE = require('./constant').SIGNUPTYPE;
const utils = require('../utils');

const FB_findOrCreateUser = (fbUserData) => {

    const currUserData = new UserModel(
        {
            userID: fbUserData.id, 
            name: fbUserData.displayName, 
            photoLink: fbUserData.photos[0].value, 
            signUpType: SIGNUPTYPE.FB
        }
    );


    const pResult = UserDao.findOrCreate(currUserData);

    return pResult;
};


const getUserDataByOAuthID = (req, res, next) => {

      
    const pResult = UserModel.findOne({userID: req.body.user_oathid});

    pResult.then(data => {

        utils.toJsonResponserMiddleWare(req, data, next);
    }).catch(err => utils.toJsonResponserMiddleWare(req, utils.wrapErrorObjToErrorMsg(err), next));

};

const UserService = {

    FB_findOrCreateUser,getUserDataByOAuthID
};

module.exports = UserService;
