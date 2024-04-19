const { Router } = require('express')
const { authentication } = require('../../middlewares/authorization.middleware')
const UserController = require('../../controllers/users.controller')
const { logger } = require('../../utils/logger')
const { uploader } = require('../../utils/uploader')
const router = Router()
const userController = new UserController()

router.get('/register', async (req, res) =>{
    // sinc o async ?
    try {
        res.render('register')
        
    } catch (error) {
        logger.error(error)
    }
});

router.get('/login', async (req, res) =>{
    // sinc o async ?
    try {
        res.render('login')
        
    } catch (error) {
        logger.error(error)
    }
});

router.get('/', userController.getAll)

router.post('/', userController.create)

router.put('/:uid', userController.update)

router.delete('/:uid', userController.delete)

router.put('/premium/:uid', userController.changeRole)

router.post('/:uid/documents', uploader.array('documents') , userController.addDocument)

module.exports = router
