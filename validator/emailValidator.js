const validator = require('validator')

const validate = user => {
    let error = {}

    
    if (!user.currentEmail) {
        error.email = 'Please Provide Your Email'
    } else if (!validator.isEmail(user.currentEmail)) {
        error.email = 'Please Provide a Valid Email'
    }
    if (!user.newEmail) {
        error.newEmail = 'Please Provide Your Email'
    } else if (!validator.isEmail(user.newEmail)) {
        error.newEmail = 'Please Provide a Valid Email'
    }

    if (!user.confirmEmail) {
        error.confirmEmail = `Email doesn't match`
    } else if (!validator.isEmail(user.confirmEmail)) {
        error.confirmEmail = `Email doesn't match`
    }
      else if (user.newEmail!== user.confirmEmail) {
        error.confirmEmail = 'Email Doesn\'t Match'
    }
    return {
        error,
        isValid: Object.keys(error).length === 0
    }
}

module.exports = validate