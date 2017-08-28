var passport            = require("passport"),
    LocalStrategy       = require("passport-local").Strategy,
    User                = require("../model/UserModel");

    module.exports = function(passport){
        passport.serializeUser(function(user, done){
            done(null, user.id);
        });

        passport.deserializeUser(function(id, done){
            User.findById(id, function(err, user){
                done(err, user);
            });
        });

        passport.use("local-register", new LocalStrategy(
            function(username, password, done){
                User.findOne({username: username}).then(function(user){
                        if(!user){
                            var newUser = new User();
                            newUser.username = username;
                            newUser.password = password;

                            newUser.save().then(function(registeredUser){
                                return done(null, registeredUser);
                            }).catch(function(err){
                                throw err;
                            });
                        } else {
                            return done(null, false, {message: "Username already taken"});
                        }
                    }).catch(function(err){
                        return done(err);
                    });
            }
        ));

        passport.use("local-login", new LocalStrategy(
            function(username, password, done){
                User.findOne({username: username}).then(function(user){
                    if(!user){
                        return done(null, false, {message: "User does not exist"});
                    } else if (!user.validatePassword(password)){
                        return done(null, false, {message: "Incorrect password"});
                    }

                    return done(null, user);
                }).catch(function(err){
                    return done(err);
                });
            }
        ));
    };
