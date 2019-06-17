const passport = require('passport')
const router = require('express').Router()
// const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const {User} = require('../db/models')
module.exports = router

router.get('/', passport.authenticate('google', {scope: ['email', 'profile']}))

router.get(
  '/callback',
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/'
  })
)

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID:
        '91399288169-ldha4de0nf4a5vdlbn4as4m246e6h20r.apps.googleusercontent.com',
      clientSecret: 'iwG0wOChy0iphBhUlmjSvKln',
      callbackURL: '/auth/google/callback'
    },
    (token, refreshToken, profile, done) => {
      const googleId = profile.id
      const name = profile.displayName
      const email = profile.emails[0].value
      let password
      if (!profile.password) {
        password = profile.id
      }

      User.findOrCreate({
        where: {googleId},
        defaults: {name, email, password}
      })
        .spread(user => {
          done(null, user)
        })
        .catch(done)
      passport.serializeUser((user, done) => {
        done(null, user.id)
      })
      passport.deserializeUser((id, done) => {
        User.findByPk(id)
          .then(user => {
            done(null, user)
          })
          .catch(err => {
            done(err)
          })
      })
    }
  )
)
