const { Router } = require('express')
const { authentication } = require('../../middlewares/auth.middleware');
const UserController = require('../../controllers/users.controller');

const router = Router()
const {
    getUsers,
    createUser,
    updateUser,
    deleteUser
} = new UserController()

//
router.get('/register', async (req, res) =>{
    // sinc o async ?
    try {
        res.render('register')
        
    } catch (error) {
        console.log(error)
    }
});

router.get('/login', async (req, res) =>{
    // sinc o async ?
    try {
        res.render('login')
        
    } catch (error) {
        console.log(error)
    }
});

router.get('/', getUsers );


// POST localhost:8080  /api/users /
router.post('/', createUser );
// PUT localhost:8080  /api/users /:uid
router.put('/:uid', updateUser )

// DELETE localhost:8080  /api/users /:uid
router.delete('/:uid', deleteUser)

module.exports = router
