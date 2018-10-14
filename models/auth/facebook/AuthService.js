const FacebookStrategy = require('passport-facebook');
const AppKeys = require('../../../conf/key');
const UserService = require('../../users/UserService');


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
        UserService.FB_findOrCreateUser(profile)
            .then((userData) => cb(null,userData))
            .catch(err => cb(err, null));


    }));

    passportRef.serializeUser((user, cb) => {
        cb(null, user);
    });

    passportRef.deserializeUser((obj, cb) => {
        cb(null, obj);
    });

};