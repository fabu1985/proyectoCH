const nodemailer = require('nodemailer')
const { configObject } = require('../config')

const transport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: configObject.gmail_user_app,
        pass: configObject.gmail_pass_app
    }
})

exports.sendMail = async (destinatary, subject, html) => {
    return await transport.sendMail({
        from: 'Este mail lo envia <fabutacatest@gmail.com>',
        to: destinatary,
        subject,
        html,
        attachments: [{
            filename: 'pishing.jpeg',
            path: __dirname + '/pishing.jpeg',
            cid: 'node'
        }]
    })
}
