
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Profile = require('../model/profile')
const Company = require('../model/company')
const Jobpost = require('../model/jobpost')
const registerValidator = require('../validator/registerValidator')
const loginValidator = require('../validator/loginValidator')
const emailValidator = require('../validator/emailValidator')
const passwordValidator = require('../validator/passwordValidator')
const { serverError, resourceError } = require('../utils/error')
module.exports = {
    findJobs(req, res) {
        let { location } = req.params
        Jobpost.find({ location })
            // Use Populate for transaction
            .populate('company')
            .exec()
            .then(jobs => {
                if (!jobs) {
                    resourceError(res, error)
                }
                //console.log(user)
                res.status(200).json({
                    companies: jobs
                })

            })
            .catch(error => serverError(res, error))
    },
    findCompanies(req, res) {
        let { email } = req.user
        console.log(email)
        /* Profile.find({ email },'companies')
        .populate({
            path: 'companies',
            model: 'Company',
            populate: {
                path: 'jobposts',
                model: 'Jobpost'
            }
        })
            .exec()
            .then(user => {
                if (!user) {
                    resourceError(res, error)
                }
                console.log(user)
                res.status(200).json({
                    companies: user
                })

            })
            .catch(error => serverError(res, error))

       /* Company.find()
            // Use Populate for transaction
            //.populate('profile')
            //.exec()e
            .then(user => {
                if (!user) {
                    resourceError(res, error)
                }
                console.log(user)
                res.status(200).json({
                    companies: 'user.companies.company_name'
                })

            })
            .catch(error => serverError(res, error))*/
        Profile.find({ email }, 'companies')
            .exec()
            .then(jobs => {
                if (!jobs) {
                    resourceError(res, error)
                }
                console.log(jobs[0].companies)
                let ab = jobs[0].companies
                Company.find({
                    '_id': { $in: ab }
                })
                    .then(user => {
                        if (!user) {
                            resourceError(res, error)
                        }
                        
                        Jobpost.find({
                            'company': { $in: ab }
                        })
                            .then(result => {
                                if (!result) {
                                    resourceError(res, error)
                                }
                               

                                res.status(200).json({
                                    companies: user,
                                    jobposts: result
                                })

                            })
                            .catch(error => serverError(res, error))
                    })
                    .catch(error => serverError(res, error))
            }).catch(error => serverError(res, error))
            
        },

    postJobWithCompany(req, res) {
        let { company_name, website, logo_url, short_description, job_title, location, remote, job_type, salary, experience, apply_link, tags, description } = req.body
        console.log(req.user._id)
        let company = new Company({
            profile: req.user._id, company_name, website, logo_url, short_description, jobposts: []
        })

        company.save()
            .then(comp => {
                Profile.findOneAndUpdate({ _id: req.user._id }, { $push: { companies: comp._id } }, { new: true })
                    .then(res => {

                    })
                    .catch(error => serverError(res, error))
                let jobpost = new Jobpost({
                    company: comp._id, job_title, location, remote, job_type, salary, experience, apply_link, tags, description, featured: false
                })
                jobpost.save()
                    .then(postt => {
                        Company.findOneAndUpdate({ _id: comp._id }, { $push: { jobposts: postt._id } }, { new: true })
                            .then(res => {

                            })
                            .catch(error => serverError(res, error))

                    })
                    .catch(error => serverError(res, error))
            })
            .catch(error => serverError(res, error))
    },
    postJobWithExistedCompany(req, res) {
        let { company, job_title, location, remote, job_type, salary, experience, apply_link, tags, description, featured } = req.body;


        let jobpost = new Jobpost({
            company, job_title, location, remote, job_type, salary, experience, apply_link, tags, description, featured
        })
        jobpost.save()
            .then(postt => {
                Company.findOneAndUpdate({ _id: company }, { $push: { jobposts: postt._id } }, { new: true })
                    .then(res => {
                        res.status(200).json({
                            message: 'Updated Successfullycompanyss',
                            transactionjjjjprofile: res
                        })
                    })
                    .catch(error => serverError(res, error))
                res.status(200).json({
                    jobpostt: postt
                })

            })
            .catch(error => serverError(res, error))
    }
}