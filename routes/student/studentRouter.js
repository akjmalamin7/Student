const router = require('express').Router()
const {newStudent, allStudents} = require('../../controllers/studentController')



router.post('/add', newStudent)
router.get('/list', allStudents)



module.exports = router