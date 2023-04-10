const router = require('express').Router()
const {newUser, loginUser} = require('../../controllers/userController')



router.post('/register', newUser)
router.post('/login', loginUser)



module.exports = router