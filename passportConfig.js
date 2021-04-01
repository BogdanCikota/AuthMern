const User = require('./user');
const bcrypt = require('bcryptjs');
const localStrategy = require('passport-local').Strategy;

module.exports = function (passport) {
    passport.use(
        new localStrategy((username, password, done) => {
            User.findOne({ username: username }, (err, user) => {
                if (err) throw err;
                if (!user) return done(null, false);
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) throw err;
                    if (result === true) {
                        return done(null, user);
                    } else {
                        done(null, false);
                    }
                });
            });
        })
    );

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            if(err) throw err;

            if(user) {
                const userInformation = {
                    username: user.username,
                    id: user._id
                };
    
                done(err, userInformation);
            } else {
                const userInformation = {
                    username: '',
                    id: ''
                };
    
                done(err, userInformation);
            }
            
        });
    });

};