import { CallbackError } from 'mongoose';
import * as passport from 'passport'
import { User, UserDocument } from '../models/user';

const passportSerializer = () => {
    passport.serializeUser((user: any, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err: CallbackError, user: UserDocument | null) => {
            done(err, user);
        });
    })
}

export default passportSerializer
