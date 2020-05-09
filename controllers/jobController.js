
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Profile = require('../model/profile')
const Company = require('../model/company')
const Jobpost = require('../model/jobpost')
const jobPostValidator = require('../validator/jobPostvalidator')
const jobPostCompanyValidator = require('../validator/jobPostCompanyvalidator')
const { serverError, resourceError } = require('../utils/error')
module.exports = {
    findJobs(req, res) {
        let { location, _id } = req.body
        findfunc = () => {
            if (!location) { return { _id } }
            else {
                return { location }
            }
        }
        Jobpost.find(findfunc())
            // Use Populate for transaction
            .populate('company')
            .exec()
            .then(jobs => {
                if (!jobs) {
                    resourceError(res, error)
                }
                //console.log(user)
                res.status(200).json({
                    jobs
                })

            })
            .catch(error => serverError(res, error))
    },
    findCompanyToEdit(req, res) {
        let { email } = req.user
        console.log(email)
        let { _id } = req.body
        Profile.findOne({ email }, 'companies')
            .exec()
            .then(prof => {
                console.log(prof)
                if (!prof) {
                    resourceError(res, error)
                }
                let comp_id = prof.companies.find((value) => {
                    return (value._id == _id)
                });
                console.log(comp_id)
                if (!comp_id) {
                    resourceError(res, error)
                }
                Company.findOne({ _id: comp_id })
                    .exec()
                    .then(result => {
                        if (!result) {
                            resourceError(res, error)
                        }
                        res.status(200).json({
                            result
                        })
                    }).catch(error => serverError(res, error))
            }).catch(error => serverError(res, error))
    },
    findJobToEdit(req, res) {
        let { email } = req.user
        console.log(email)
        let { _id } = req.body
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
                            'company_id': { $in: ab }
                        })
                            .then(result => {
                                if (!result) {
                                    resourceError(res, error)
                                }
                                console.log(result)
                                let job = result.find((value) => {
                                    return (value._id == _id)
                                });
                                if (!job) {
                                    resourceError(res, error)
                                }
                                res.status(200).json({
                                    companies: user,
                                    jobposts: job
                                })

                            })
                            .catch(error => serverError(res, error))
                    })
                    .catch(error => serverError(res, error))
            }).catch(error => serverError(res, error))

    },
    findCompanies(req, res) {
        let { email } = req.user
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
                            'company_id': { $in: ab }
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
        let validate = jobPostCompanyValidator({ company_name, website, logo_url, short_description, job_title, location, remote, job_type, salary, experience, apply_link, tags, description })
        if (!validate.isValid) {
            return res.status(400).json(validate.error)
        }
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
                    company_id: comp._id, job_title, location, remote, job_type, salary, experience, apply_link, tags, description, featured: false
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
        let { company_id, job_title, location, remote, job_type, salary, experience, apply_link, tags, description, featured } = req.body;
        let validate = jobPostValidator({ company_id, job_title, location, remote, job_type, salary, experience, apply_link, tags, description })
        if (!validate.isValid) {
            return res.status(400).json(validate.error)
        }
        let jobpost = new Jobpost({
            company_id, job_title, location, remote, job_type, salary, experience, apply_link, tags, description, featured
        })
        jobpost.save()
            .then(postt => {
                Company.findOneAndUpdate({ _id: company_id }, { $push: { jobposts: postt._id } }, { new: true })
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