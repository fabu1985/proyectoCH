const { Router } = require('express')
const { authentication } = require('../middlewares/auth.middleware')
const UserDaoMongo = require('../dao/mongo/usersDao.mongo')

const router = Router()
const usersService = new UserDaoMongo
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

router.get('/', authentication, async (req, res) =>{
    // sinc o async ?
    try {
        const users = await usersService.getUsers()
        res.send(users)
        
    } catch (error) {
        console.log(error)
    }
});


// POST localhost:8080  /api/users /
router.post('/', authentication, async (req, res) =>{
    try {
        const {first_name, last_name, email, password, role, atCreated} = req.body
        // validación
        const result = await usersService.createUser({
            first_name,
            last_name,
            email,
            password,
            role,
            atCreated
        })
        console.log(first_name, last_name, email)
        res.status(201).send({ 
            status: 'success',
            payload: result        
        })
    } catch (error) {
        console.log(error)
    }
    
});
// PUT localhost:8080  /api/users /:uid
router.put('/:uid',  async (req, res) =>{

    const { uid } = req.params
    const userToReplace = req.body
    // venga el id
    const result = await usersService.updateUser({_id: uid}, userToReplace)
    res.status(201).send({ 
        status: 'success',
        payload: result 
    })
})

// DELETE localhost:8080  /api/users /:uid
router.delete('/:uid', authentication, async  (req, res)=> {
    const { uid } = req.params

    const result = await usersService.deleteUser({_id: uid})
    res.status(200).send({ 
        status: "success", 
        payload: result 
    })
})

module.exports = router
