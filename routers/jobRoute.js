const router = require('express').Router()
const authenticate = require('../authenticate')

const { check, findJobs, findCompanyToEdit, findJobToEdit, findCompanies, postJobWithCompany, postJobWithExistedCompany, payforfeature, findFeaturedPost, featuredPostClose } = require('../controllers/jobController')
router.post('/jobs', findJobs)
router.post('/check', check)
router.post('/find-job-edit', authenticate, findJobToEdit)
router.post('/find-company-edit', authenticate, findCompanyToEdit)
router.get('/companies', authenticate, findCompanies)
router.post('/post-job', authenticate, postJobWithExistedCompany)
router.post('/post-company-job', authenticate, postJobWithCompany)
router.post('/payFor-feature', authenticate, payforfeature)
router.get('/find-featured-post', authenticate, findFeaturedPost)
router.post('/featured-post-close', authenticate, featuredPostClose)

module.exports = router