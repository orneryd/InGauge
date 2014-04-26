/**
 * Created by tsweet on 4/11/14.
 */
var passport = require('passport'),
    localStrategy = require('passport-local').Strategy,
    mongoose = require('mongoose'),
    passwordHash = require('password-hash'),
    users = mongoose.model('question'), 
    HASH_ALGORITHM = "sha1";


passport.use(new localStrategy(
    function(username, password, done) {
        users.findOne({ email: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            var isValid = passwordHash.verify('password123', [HASH_ALGORITHM, user.passwordSalt, user.passwordHash].join("$"))
            if (isValid) {
                return done(null, user);
            }
            return done(null, false, { message: 'Incorrect password.' });
        });
    }
));

exports = passport;