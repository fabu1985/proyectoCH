const { connect } = require("mongoose")
const dotenv = require('dotenv')
const { program } = require("../utils/commander")
const { logger } = require("../utils/logger")


const { mode } = program.opts()
logger.info('mode config: ', mode)
dotenv.config({
    path: mode == 'production' ? './.env.production' : './.env.development'
})

const configObject = {
    PORT: process.env.PORT || 3333,
    mongo_url: process.env.MONGO_URL,
    persistence: process.env.PERSISTENCE,
    jwt_secret_key: process.env.JWT_SECRET_KEY,
    gh_client_id: '',
    gh_secret_secret:'',
    gmail_user_app: process.env.GMAIL_USER_APP,
    gmail_pass_app: process.env.GMAIL_PASS_APP,
    twilio_auth_token: process.env.TWILIO_ATUH_TOKEN,
    twilio_account_sid: process.env.TWILIO_ACCOUNT_SID,
    twilio_number_phone: '+15097743685'
}

const connectDB = async () => {
    try {
        await connect(process.env.MONGO_URL)
        logger.info('Base de datos conectada')   
    } catch (err) {
        logger.info(err)
    }
} 

module.exports = {
    configObject,
    connectDB
}
