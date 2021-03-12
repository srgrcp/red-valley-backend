import { CallbackError } from 'mongoose'
import * as passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { User, UserDocument } from '../models/user'

const passportLocalStrategy = () => {
    passport.use(new LocalStrategy((username, password, done) => {
        User.findOne({ username: username }, (err: CallbackError, user: UserDocument | null) => {
            if (err) { return done(err) }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' })
            }
            if (!user.validPassword(password)) {
                return done(null, false, { message: 'Incorrect password.' })
            }
            return done(null, user)
        })
    }))
}

export default passportLocalStrategy
