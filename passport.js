const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const Profile = require('./model/profile')

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken() || ExtractJwt.fromUrlQueryParameter("token");
opts.secretOrKey = 'SECRET';
console.log("ghhh", ExtractJwt.fromAuthHeaderAsBearerToken(), "aq", ExtractJwt.fromUrlQueryParameter("token"))
module.exports = passport => {
    passport.use(new JwtStrategy(opts, (payload, done) => {
        Profile.findOne({ _id: payload._id })
            .then(result => {

                if (!result) {
                    return done(null, false)
                } else {
                    return done(null, result)
                }
            })
            .catch(error => {
                console.log(error)
                return done(error)
            })
    }))
}