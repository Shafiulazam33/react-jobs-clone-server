const validator = require('validator')

const validate = user => {
    let error = {}

    if (!user.company_id) {
        error.company_id = 'Please Select a company'
    }

    if (!user.job_title) {
        error.job_title = 'Please Provide job_title'
    }
    if (!user.location) {
        error.location = 'Please Provide location'
    }
    if (!user.remote) {
        error.remote = 'Please Provide remote'
    }
    if (!user.job_type) {
        error.job_type = 'Please Provide job_type'
    }
    if (!user.salary) {
        error.salary = 'Please Provide salary'
    }
    if (!user.experience) {
        error.experience = 'Please Provide experience'
    }
    if (!user.apply_link) {
        error.apply_link = 'Please Provide apply_link or email'
    } else if (!validator.isURL(user.apply_link) && !validator.isEmail(user.apply_link)) {
        error.apply_link = 'Not a url or email'
    }
    if (!user.tags) {
        error.tags = 'Please Provide tags'
    }
    if (!user.description) {
        error.description = 'Please Provide description'
    }
    return {
        error,
        isValid: Object.keys(error).length === 0
    }
}

module.exports = validate