const { connect } = require("mongoose")

exports.connectDB = async () => {
    try {
        await connect('mongodb+srv://fabianadiazp:FABU1985@cluster0.qn3ysof.mongodb.net/ecommerce?retryWrites=true&w=majority');
        console.log('base de datos conectada')
    } catch (err) {
        console.log(err)
    }
}