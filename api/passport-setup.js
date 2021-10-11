var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./models/user')

passport.use(new GoogleStrategy({
    clientID: "468839431383-msqljgls3haj84nb66ueeugeoq9ln7vp.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:3000/auth/google/callback"
},
    async function (accessToken, refreshToken, profile, done) {
        const newUser = {
            googleId: profile.id,
            displayName: profile.displayName,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            image: profile.photos[0].value
        }

        try {
            let user = await User.findOne({ googleId: profile.id })

            if (user) {
                done(null, user)
            } else {
                user = await User.create(newUser)
                done(null, user)
            }
        } catch (error) {
            console.error(error)
        }
        return done(null, profile);
    }
));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});