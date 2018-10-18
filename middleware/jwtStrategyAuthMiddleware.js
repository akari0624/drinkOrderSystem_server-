const passport = require('passport');
const PassportJWTStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const UserModel = require('../models/users/User');
const conf = require('../conf/key');


const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader(conf.jwtKeyInEveryRequestHeader),
    secretOrKey: conf.jwtSecret
};

// write our jwt strategy after extract jwt String from request
// header:authorization
const jwtLogin = new PassportJWTStrategy(jwtOptions, (payload, done) => {

    const userID = payload.sub;
    UserModel
        .findOne({userID})
        .then(user => {
            if (user) {

                //在這個middleware之後的middleware的req裡加上一個屬性叫user
                return done(null, user);
            }

            return done('請勿在未註冊會員的情況下嘗試存取本應用程式的API，謝謝!', false);
        })
        .catch(err => {
            return done(err, false);
        });
});

// tell passport to use this strategy
passport.use(jwtLogin);


exports.requireJWTAuth = passport.authenticate('jwt', { session: false });