const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    userID:String,
    name:String,
    photoLink:String,
    email:String,
    password:String,
    signUpType:String,
},{ usePushEach: true });  // https://github.com/Automattic/mongoose/issues/5574



UserSchema.pre('save',(next)=>{

    const user = this;
    if(user.userID === '' && user.email === ''){
        return next(new Error('使用者的userID跟Email不該同時為空白'));
    }

    if(user.email !== '' && user.password === ''){
        return next(new Error('使用Local方式註冊的話，password不該為空白'));
    }

    if(user.signUpType === ''){
        return next(new Error('signUpType不該為空白'));
    }

    next();
});


const User = mongoose.model('user',UserSchema);

module.exports  = User;