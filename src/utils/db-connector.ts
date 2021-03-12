import { connect } from "mongoose"

const {
    MONGO_USERNAME,
    MONGO_PASSWORD,
    MONGO_HOSTNAME,
    MONGO_PORT,
    MONGO_DB
} = process.env

const options = {
    useNewUrlParser: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500,
    connectTimeoutMS: 10000,
}

const connectDB = () => {
    const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`
    connect(url, options)
    .catch(error => {
        console.error('[DB CONNECTOR ERROR]', error)
    })
    .then(idk => {
        if (idk) console.log('[DB] Connected')
    })
}

export default connectDB
