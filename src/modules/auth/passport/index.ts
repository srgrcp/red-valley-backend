import passportLocalStrategy from "./local-strategy"
import passportSerializer from "./serializer"

const setupPassport = () => {
    passportLocalStrategy()
    passportSerializer()
}

export default setupPassport
