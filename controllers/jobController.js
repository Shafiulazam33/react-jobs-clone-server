
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
        let { email } = req.body


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
                    companies: 'user.companies.company_name'
                })

            })
            .catch(error => serverError(res, error))
    },
    postJobWithCompany(req, res) {
        let { profile_id, company_name, website, logo_url, short_description, job_title, location, remote, job_type, salary, experience, apply_link, tags, description, featured } = req.body;
        let company = new Company({
            profile: profile_id, company_name, website, logo_url, short_description, jobposts: []
        })

        company.save()
            .then(comp => {
                Profile.findOneAndUpdate({ _id: profile_id }, { $push: { companies: comp._id } }, { new: true })
                    .then(result => {
                        res.status(200).json({
                            message: 'Updated Successfully',
                            transactionjjjjprofile: result
                        })
                    })
                    .catch(error => serverError(res, error))
                let jobpost = new Jobpost({
                    company: comp._id, job_title, location, remote, job_type, salary, experience, apply_link, tags, description, featured
                })
                jobpost.save()
                    .then(postt => {
                        Company.findOneAndUpdate({ _id: comp._id }, { $push: { jobposts: postt._id } }, { new: true })
                            .then(result => {
                                res.status(200).json({
                                    message: 'Updated Successfullycompany',
                                    transactionjjjjprofile: result
                                })
                            })
                            .catch(error => serverError(res, error))
                        res.status(200).json({
                            jobpostt: postt
                        })
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
                    .then(result => {
                        res.status(200).json({
                            message: 'Updated Successfullycompanyss',
                            transactionjjjjprofile: result
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