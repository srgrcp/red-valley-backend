import * as express from 'express'
import * as cookieParser from 'cookie-parser'
import * as logger from 'morgan'
import * as passport from 'passport'

import apiRouter from './utils/api-router'
import connectDB from './utils/db-connector'
import setupPassport from './modules/auth/passport'

connectDB()
setupPassport()

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(passport.initialize())
app.use(passport.session())

app.use('/api', apiRouter)

module.exports = app
