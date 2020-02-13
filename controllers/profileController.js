const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const profile = require('../model/profile')
const registerValidator = require('../validator/registerValidator')
const loginValidator = require('../validator/loginValidator')
const emailValidator = require('../validator/emailValidator')
const passwordValidator = require('../validator/passwordValidator')
const {serverError, resourceError} = require('../utils/error')
module.exports = {
    login(req, res) {
        let { email, password } = req.body
        let validate = loginValidator({ email, password })
        
        if (!validate.isValid) {
            return res.status(400).json(validate.error)
        }
        
        profile.findOne({ email })
            // Use Populate for transaction
            .then(user => {
                if (!user) {
                    return resourceError(res, 'User Not Found')
                }
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) {
                        return serverError(res, err)
                    }
                    if (!result) {
                        return resourceError(res, 'Password Doesn\'t Match')
                    }

                    let token = jwt.sign({
                        _id: user._id,
                       
                        email: user.email,
                        
                        jobposts: user.jobposts
                    }, 'SECRET', {expiresIn: '100h'})

                    res.status(200).json({
                        message: 'Login Successful',
                        token: `Bearer ${token}`
                    })

                })
            })
            .catch(error => serverError(res, error))

        // Generate Token and Response Back
    },
    register(req, res) {
        let {  email, password, confirmPassword } = req.body
        let validate = registerValidator({  email, password, confirmPassword })
        
        if (!validate.isValid) {
            return res.status(400).json(validate.error)
        } else {
            profile.findOne({ email })
                .then(user => {
                    if (user) {
                        return resourceError(res, 'Email Already Exist')
                    }

                    bcrypt.hash(password, 11, (err, hash) => {
                        if (err) {
                            return resourceError(res, 'Server Error Occurred')
                        }

                        let Profile = new profile({
                            
                            email,
                            password: hash,
                            
                            jobposts: []
                        })

                        Profile.save()
                            .then(user => {
                                res.status(201).json({
                                    message: 'User Created Successfully',
                                    user
                                })
                            })
                            .catch(error => serverError(res, error))
                    })
                })
                .catch(error => serverError(res, error))
        }
    },
    updateEmail(req, res) {
        let {currentEmail, newEmail,confirmEmail} = req.body
        let validate = emailValidator({ currentEmail, newEmail,confirmEmail })
        
        if (!validate.isValid) {
            return res.status(400).json(validate.error)
        }
        
        profile.findOne({ currentEmail })
            // Use Populate for transaction
            .then(user => {
                if (!user) {
                    return resourceError(res, 'User Not Found')
                }
                
            })
            .catch(error => serverError(res, error))

        // Generate Token and Response Back
    },
    updatePassword(req, res) {
        let { currentPassword,newPassword,confirmPassword } = req.body
        let validate = passwordValidator({  currentPassword,newPassword,confirmPassword  })
        
        if (!validate.isValid) {
            return res.status(400).json(validate.error)
        }
        
        profile.findOne({ email })
            // Use Populate for transaction
            .then(user => {
                if (!user) {
                    return resourceError(res, 'User Not Found')
                }
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) {
                        return serverError(res, err)
                    }
                    if (!result) {
                        return resourceError(res, 'Password Doesn\'t Match')
                    }

                    let token = jwt.sign({
                        _id: user._id,
                       
                        email: user.email,
                        
                        jobposts: user.jobposts
                    }, 'SECRET', {expiresIn: '100h'})

                    res.status(200).json({
                        message: 'Login Successful',
                        token: `Bearer ${token}`
                    })

                })
            })
            .catch(error => serverError(res, error))

        // Generate Token and Response Back
    }
}