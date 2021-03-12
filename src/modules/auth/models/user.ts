import { Schema, model, Document, Model } from 'mongoose'
import * as mongoosePaginate from 'mongoose-paginate-v2'
import * as crypto from 'crypto'

interface UserBase {
    username: String
    password: String
    salt?: String
    sessions?: [String?]
}

export interface UserDocument extends UserBase, Document {
    validPassword(password: string): boolean
    setPassword(password: string): void
}

interface UserModel extends Model<UserDocument> { }

interface ISignupInput {
    username?: string
    password?: string
}

const userSchema = new Schema<UserDocument, UserModel>({
    username: { type: String, lowercase: true, required: true, unique: true },
    password: { type: String, requiredPaths: true },
    salt: { type: String },
    sessions: [{ type: String, ref: 'Token' }]
})

userSchema.plugin(mongoosePaginate as any)

userSchema.methods.validPassword = function (password: string) {
    if (!this.salt) return false
    var hash = crypto.pbkdf2Sync(password, this.salt as any, 10000, 512, 'sha512').toString('hex');
    return this.password === hash;
}

userSchema.methods.setPassword = function (password: string) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.password = crypto.pbkdf2Sync(password, this.salt as any, 10000, 512, 'sha512').toString('hex');
}

export const User = model('User', userSchema)

export class SignupInput implements ISignupInput {
    username: string | undefined
    password: string | undefined

    constructor({ username, password }: ISignupInput) {
        this.username = username
        this.password = password
    }

    isValid() {
        return this.username && this.password
    }

    toUserModel() {
        if (!this.password) return null
        const user = new User({ username: this.username })
        user.setPassword(this.password)
        return user
    }
}
