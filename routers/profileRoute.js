const router = require('express').Router()

const {login,register,updateEmail,updatePassword} = require('../controllers/profileController')

// Registration Route
// localhost:4000/api/users/register
router.post('/register', register)
router.post('/login', login)
router.put('/update-email', updateEmail)
router.put('/update-password', updatePassword)
// Login Route
// localhost:4000/api/users/login


module.exports = router