const { EErrors } = require("../../services/errors/enum");

exports.handleError = ( err, req, res, next ) => {
    switch (err.code) {
        case EErrors.INVALID_TYPES_ERROR:
            return res.send({status: 'error', error: err.message})
            break;
        default:
            return res.status(500).send({status: 'error', error: 'error del server'})
            break;
    }
}