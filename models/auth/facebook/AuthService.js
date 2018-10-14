const FacebookStrategy = require('passport-facebook');
const AppKeys = require('../../../conf/key');
const UserService = require('../../users/UserService');
const jwt = require('jwt-simple');

exports.applyFaceBookAuthStrategy = (passportRef) => {

    passportRef.use(new FacebookStrategy({
        clientID: AppKeys.facebookAuthAppId,
        clientSecret: AppKeys.facebookAuthAppSecrect,
        callbackURL: 'http://localhost:8089/auth/facebook/callback',
        profileFields: ['id', 'displayName', 'photos', 'email']
    }, function (accessToken, refreshToken, profile, cb) {

        console.log('accessToken', accessToken);

        console.log('refreshToken', refreshToken);

        console.log('profile', profile);

        // User.findOrCreate({ facebookId: profile.id }, function (err, user) {   return
        // cb(err, user); });
        UserService
            .FB_findOrCreateUser(profile)
            .then((userData) => cb(null, userData))
            .catch(err => cb(err, null));

    }));

    passportRef.serializeUser((user, cb) => {
        cb(null, user);
    });

    passportRef.deserializeUser((obj, cb) => {
        cb(null, obj);
    });

};

const tokenForUser = (user) => {
    const timeStamp = new Date().getTime();
    return jwt.encode({
        sub: user.userID,
        iat: timeStamp
    }, AppKeys.jwtSecret);
};

exports.sendBackFacebookOAuthJWTBYCookie = (req, res) => {


    /*透過13行auth/callback handler那裡的處理之後，req裡會多一個叫user的屬性 */
    console.log('in final callback, userdata', req.user);
    const userData = req.user.userData;
    const token = tokenForUser(userData);
    console.log('in final callback, userToken',token);
    res.cookie('auth_token', token);
    res.redirect(301, 'http://localhost:9999/');

};