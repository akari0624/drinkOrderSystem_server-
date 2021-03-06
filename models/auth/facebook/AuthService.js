const FacebookStrategy = require('passport-facebook');
const AppKeys = require('../../../conf/key');
const AppUrls = require('../../../conf/urls');
const UserService = require('../../users/UserService');
const jwt = require('jwt-simple');

exports.applyFaceBookAuthStrategy = (passportRef) => {

    passportRef.use(new FacebookStrategy({
        clientID: AppKeys.facebookAuthAppId,
        clientSecret: AppKeys.facebookAuthAppSecrect,
        callbackURL: AppUrls.expressBackendFBRedirectCallbackURL,
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

const tokenForUser =  (user) => {
    const timeStamp = new Date().getTime();

    console.log('user in tokenForUser', user);
    return jwt.encode({
        sub: user.userID,
        iat: timeStamp
    }, AppKeys.jwtSecret);
};

exports.sendBackFacebookOAuthJWTBYCookie = (req, res) => {


    /*透過13行auth/callback handler那裡的處理之後，req裡會多一個叫user的屬性 */
    console.log('in final callback, userdata', req.user);
    const userData = req.user.userData;
    const tokenValue = tokenForUser(userData);

    console.log('tokenForUser', tokenValue);
    
    res.cookie('auth_token', tokenValue);
    res.redirect(301, AppUrls.frontendMainLandingPageRoute);
   

};