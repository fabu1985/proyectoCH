const multer = require('multer');
const { dirname } = require('path');
const { logger } = require('./logger');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null,`${dirname(__dirname)}/public/uploads` )
    },
    filename: function(req, file, cb) {
        cb(null,`${Date.now()}-${file.originalname}` )
    }
});

const uploader = multer ({
    storage,
    onError: function (error, next) {
        logger.error(error);
        next()
    }
});

module.exports = {
    uploader
}