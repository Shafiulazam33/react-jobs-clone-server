const router = require('express').Router()


const  {findCompanies,postJobWithCompany,postJobWithExistedCompany}=require('../controllers/jobController')

router.post('/companies', findCompanies)
router.post('/post-job',postJobWithExistedCompany)
router.post('/post-company-job',postJobWithCompany)

module.exports = router