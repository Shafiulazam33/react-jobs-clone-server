const router = require('express').Router()
const authenticate = require('../authenticate')

const  {findJobs,findCompanies,postJobWithCompany,postJobWithExistedCompany}=require('../controllers/jobController')
router.get('/jobs/:location',findJobs)
router.get('/companies', authenticate, findCompanies)
router.post('/post-job', authenticate,postJobWithExistedCompany)
router.post('/post-company-job', authenticate,postJobWithCompany)

module.exports = router