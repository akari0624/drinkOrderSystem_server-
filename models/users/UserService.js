const UserDao = require('./UserDao');
const UserModel = require('./User');
const SIGNUPTYPE = require('./constant').SIGNUPTYPE;

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

const UserService = {

    FB_findOrCreateUser
};

module.exports = UserService;
