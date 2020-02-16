const router = require('express').Router()


const  {findCompanies,postJobWithCompany}=require('../controllers/jobController')

router.post('/companies', findCompanies)
router.post('/post-job',postJobWithCompany)
router.post('/post-company-job',postJobWithCompany)

module.exports = router