const router = require('express').Router()
const authenticate = require('../authenticate')

const { check, findJobs, findCompanyToEdit, findJobToEdit, findCompanies, postJobWithCompany, postJobWithExistedCompany, payforfeature } = require('../controllers/jobController')
router.post('/jobs', findJobs)
router.post('/check', check)
router.post('/find-job-edit', authenticate, findJobToEdit)
router.post('/find-company-edit', authenticate, findCompanyToEdit)
router.get('/companies', authenticate, findCompanies)
router.post('/post-job', authenticate, postJobWithExistedCompany)
router.post('/post-company-job', authenticate, postJobWithCompany)
router.post('/payFor-feature', authenticate, payforfeature)

module.exports = router