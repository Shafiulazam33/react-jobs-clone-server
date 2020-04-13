const router = require('express').Router()


const  {findJobs,findCompanies,postJobWithCompany,postJobWithExistedCompany}=require('../controllers/jobController')
router.get('/jobs/:location', findJobs)
router.get('/companies', findCompanies)
router.post('/post-job',postJobWithExistedCompany)
router.post('/post-company-job',postJobWithCompany)

module.exports = router