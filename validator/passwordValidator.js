const validator = require('validator')

const validate = user => {
    let error = {}

    if (!user.currentPassword) {
        error.password = 'Please Provide a Password'
    } else if (user.password.length < 6) {
        error.password = 'Password Must be Greater or Equal 6 Character'
    }
    if (!user.newPassword) {
        error.newPassword = 'Please Provide a Password'
    } else if (user.password.length < 6) {
        error.newPassword = 'Password Must be Greater or Equal 6 Character'
    }

    if (!user.confirmPassword) {
        error.confirmPassword = 'Please Provide Confirmation Password'
    } else if (user.password !== user.confirmPassword) {
        error.confirmPassword = 'Password Doesn\'t Match'
    }

    return {
        error,
        isValid: Object.keys(error).length === 0
    }
}

module.exports = validate