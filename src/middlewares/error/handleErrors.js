const { EErrors } = require("../../services/errors/enum");

exports.handleError = ( err, req, res, next ) => {
    switch (err.code) {
        case EErrors.INVALID_TYPES_ERROR:
                return res.send({status: 'error', error: err.message})
            case EErrors.DATABASES_ERROR:
                return res.send({status: 'error in the database', error: err.message})
            case EErrors.ROUTING_ERROR:
                return res.send({status: 'routing error', error: err.message})
            break;
        default:
            return res.status(500).send({status: 'error', error: 'error del server'})
            break;
    }
}