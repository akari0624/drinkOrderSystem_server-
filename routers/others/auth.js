const AuthService = require('../../models/auth/facebook/AuthService');
const passport = require('passport');
require('../../models/auth/facebook/AuthService').applyFaceBookAuthStrategy(passport);

module.exports = app => {

    app.use(passport.initialize());

    app.get('/auth/facebook', passport.authenticate('facebook'));

    app.get('/auth/facebook/callback', passport.authenticate('facebook', {failureRedirect: '/'}), AuthService.sendBackFacebookOAuthJWTBYCookie);

};