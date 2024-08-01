const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;

const mongoose = require("mongoose");
const Keys = require("../config/keys");

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: Keys.googleClientID,
      clientSecret: Keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
    },
    (accessTocken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then((existingUser) => {
        if (existingUser) {
          done(null, existingUser);
        } else {
          new User({
            googleId: profile.id,
            name: profile.displayName,
          })
            .save()
            .then((user) => done(null, user));
        }
      });
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: Keys.facebookClientID,
      clientSecret: Keys.facebookClientSecret,
      callbackURL: "/auth/facebook/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      User.findOne({ facebookId: profile.id }).then((existingUser) => {
        if (existingUser) {
          cb(null, existingUser);
        } else {
          new User({
            googleId: profile.id,
            name: profile.displayName,
          })
            .save()
            .then((user) => cb(null, user));
        }
      });
    }
  )
);

passport.use(
  new GitHubStrategy(
    {
      clientID: Keys.githubClientID,
      clientSecret: Keys.githubClientSecret,
      callbackURL: "/auth/github/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      User.findOne({ googleId: profile.id }).then((existingUser) => {
        if (existingUser) {
          console.log(profile);
          done(null, existingUser);
        } else {
          console.log(profile);
          new User({
            googleId: profile.id,
            name: profile.displayName,
          })
            .save()
            .then((user) => done(null, user));
        }
      });
    }
  )
);
