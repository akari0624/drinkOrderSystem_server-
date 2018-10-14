const User = require('./User');

const findOrCreate = async(userModel) => {

    const result = {
        errorMsg: '',
        userData: null
    };

    try {

        const userData = await User.findOne({userID: userModel.userID});

        if (!userData) {

            console.log('user不存在，準備創出新帳號');
            const userData = userModel.save();

            result.userData = userData;

            return result;
        }


        console.log('user已存在');
        result.userData = userData;

        return result;

    } catch (err) {
        result.errorMsg = `發生錯誤！！${err}`;
        result.userData = {};

        return result;
    }

};

const UserDao = {
    findOrCreate
};

module.exports = UserDao;