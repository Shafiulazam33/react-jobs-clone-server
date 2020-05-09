const router = require('express').Router()
const authenticate = require('../authenticate')

const { findJobs, findCompanyToEdit, findJobToEdit, findCompanies, postJobWithCompany, postJobWithExistedCompany } = require('../controllers/jobController')
router.post('/jobs', findJobs)
router.post('/find-job-edit', authenticate, findJobToEdit)
router.post('/find-company-edit', authenticate, findCompanyToEdit)
router.get('/companies', authenticate, findCompanies)
router.post('/post-job', authenticate, postJobWithExistedCompany)
router.post('/post-company-job', authenticate, postJobWithCompany)

module.exports = router