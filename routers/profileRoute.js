const router = require('express').Router()
const { login, register, updateEmail, updatePassword, updateCompany, updateJob } = require('../controllers/profileController')
const authenticate = require('../authenticate')

// Registration Route
// localhost:4000/api/users/register

router.post('/login', login)
router.post('/register', register)
router.put('/update-email', authenticate, updateEmail)
router.put('/update-password', authenticate, updatePassword)
router.put('/update-company', authenticate, updateCompany)
router.put('/update-job', authenticate, updateJob)
// Login Route
// localhost:4000/api/users/login


module.exports = router