const router = require('express').Router()
const profile = require('../model/profile')
const Company = require('../model/company')
const Jobpost = require('../model/jobpost')
const {serverError, resourceError} = require('../utils/error')
const {findCompanies,postJobWithComapny} = require('../controllers/jobController')
console.log(findCompanies)
console.log(postJobWithComapny)
// Registration Route
// localhost:4000/api/users/register
router.post('/companies', findCompanies)
//router.post('/post-job',postJob)
router.post('/post-job-company', function(req,res){
/*let { company_name,website,logo_url,short_description,job_title,location,remote,job_type,salary,experience,apply_link,tags,featured} = req.body
        
let company = new Company({
    company_name,website,logo_url,short_description,jobposts:[]
})

company.save()
.then(comp => {
    let jobpost= new Jobpost({
        company:comp._id,job_title,location,remote,job_type,salary,experience,apply_link,tags,featured
    }) 
jobpost.save()
.then(post => {
    res.status(200).json({
        jobpostt:post
    })
    .catch(error => serverError(res, error))
    
})
})
.catch(error => serverError(res, error))*/


let { company_name,website,logo_url,short_description,job_title,location,remote,job_type,salary,experience,apply_link,tags,description,featured}=req.body;
let company = new Company({
    company_name,website,logo_url,short_description,jobposts:[]
})
company.save()
.then(comp => {
    let jobpost= new Jobpost({
        company:comp._id,job_title,location,remote,job_type,salary,experience,apply_link,tags,description,featured
    }) 
    jobpost.save()
.then(postt => {
    res.status(200).json({
        jobpostt:postt})
    
    })
    .catch(error => serverError(res, error))
})
.catch(error => serverError(res, error))
})

// Login Route
// localhost:4000/api/users/login


module.exports = router