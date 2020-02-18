const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const profile = require('../model/profile')
const Company = require('../model/company')
const Jobpost = require('../model/jobpost')
const registerValidator = require('../validator/registerValidator')
const loginValidator = require('../validator/loginValidator')
const emailValidator = require('../validator/emailValidator')
const passwordValidator = require('../validator/passwordValidator')
const {serverError, resourceError} = require('../utils/error')
module.exports = {
   findCompanies(req, res) {
        let { email} = req.body
        
        
        Company.find()
        // Use Populate for transaction
        //.populate('profile')
        //.exec()e
        .then(user => {
            if (!user) {
                resourceError(res, error)
            }
            console.log(user)
            res.status(200).json({
                companies:'user.companies.company_name'
            })
           
        })
        .catch(error => serverError(res, error))
    },
   postJobWithCompany(req, res){
        let {profile, company_name,website,logo_url,short_description,job_title,location,remote,job_type,salary,experience,apply_link,tags,description,featured}=req.body;
let company = new Company({
   profile, company_name,website,logo_url,short_description,jobposts:[]
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
},
postJobWithExistedCompany(req,res){
    let { company,job_title,location,remote,job_type,salary,experience,apply_link,tags,description,featured}=req.body;
    
    
        let jobpost= new Jobpost({
            company,job_title,location,remote,job_type,salary,experience,apply_link,tags,description,featured
        }) 
        jobpost.save()
    .then(postt => {
        res.status(200).json({
            jobpostt:postt})
        
        })
        .catch(error => serverError(res, error))
}
}