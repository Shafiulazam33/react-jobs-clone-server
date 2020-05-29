const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const nodemailer = require("nodemailer");
const Profile = require('../model/profile')
const Company = require('../model/company')
const Jobpost = require('../model/jobpost')
const registerValidator = require('../validator/registerValidator')
const loginValidator = require('../validator/loginValidator')
const emailValidator = require('../validator/emailValidator')
const passwordValidator = require('../validator/passwordValidator')
const { serverError, resourceError } = require('../utils/error')
module.exports = {
    login(req, res) {
        let { email, password } = req.body
        console.log(req.body)
        let validate = loginValidator({ email, password })
        console.log(validate)
        if (!validate.isValid) {
            return res.status(400).json(validate.error)
        }

        Profile.findOne({ email })
            // Use Populate for transaction
            .then(user => {
                if (!user) {
                    return resourceError(res, 'User Not Found')
                }
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) {
                        return serverError(res, err)
                    }
                    if (!result) {
                        return resourceError(res, 'Password Doesn\'t Match')
                    }

                    let token = jwt.sign({
                        _id: user._id,
                        email: user.email,
                        isAdmin: user.isAdmin
                    }, 'SECRET', { expiresIn: '100h' })

                    res.status(200).json({
                        message: 'Login Successful',
                        token: `Bearer ${token}`
                    })

                })
            })
            .catch(error => serverError(res, error))

        // Generate Token and Response Back
    },
    register(req, res) {
        let { email, password, confirmPassword } = req.body
        let validate = registerValidator({ email, password, confirmPassword })

        if (!validate.isValid) {
            return res.status(400).json(validate.error)
        } else {
            Profile.findOne({ email })
                .then(user => {
                    if (user) {
                        return resourceError(res, 'Email Already Exist')
                    }

                    bcrypt.hash(password, 11, (err, hash) => {
                        if (err) {
                            return resourceError(res, 'Server Error Occurred')
                        }

                        let profile = new Profile({
                            email,
                            password: hash,
                            companies: [],
                        })




                        profile.save()
                            .then(user => {
                                let token = jwt.sign({
                                    _id: user._id,
                                    email: user.email,
                                    emailConfirmed: user.emailConfirmed,
                                    isAdmin: user.isAdmin
                                }, 'SECRET', { expiresIn: '100h' })
                                async function main() {
                                    let testAccount = await nodemailer.createTestAccount();

                                    let transporter = nodemailer.createTransport({
                                        host: "smtp.ethereal.email",
                                        port: 587,
                                        secure: false, // true for 465, false for other ports
                                        auth: {
                                            user: testAccount.user, // generated ethereal user
                                            pass: testAccount.pass, // generated ethereal password
                                        },
                                        tls: {
                                            rejectUnauthorized: false
                                        }
                                    });
                                    let info = await transporter.sendMail({
                                        from: '"Fred Foo 👻" <foo@example.com>', // sender address
                                        to: email, // list of receivers
                                        subject: "Hello ✔", // Subject line
                                        text: "Hello world?", // plain text body
                                        html: `<a href="localhost:4000/api/profile/email-verification?token=${token}">localhost:3000/email-verification?token=${token}</a>`, // html body
                                    });
                                    console.log("Message sent: %s", info.messageId);
                                    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
                                }
                                main().catch(console.error);

                                res.status(201).json({
                                    message: 'User Created Successfully',
                                    user
                                })
                            })
                            .catch(error => serverError(res, error))
                    })
                })
                .catch(error => serverError(res, error))
        }


    },
    emailVerification(req, res) {
        console.log(req)
        Profile.findOneAndUpdate({ email: req.user.email }, { emailConfirmed: true }, { new: true })
            .then(user => {

                res.send("<p>Email is confirmed</p>")
            })
            .catch(error => serverError(res, error))
    },
    updateEmail(req, res) {
        let { currentEmail, newEmail, confirmEmail } = req.body
        let validate = emailValidator({ currentEmail, newEmail, confirmEmail })

        if (!validate.isValid) {
            return res.status(400).json(validate.error)
        }
        Profile.findOneAndUpdate({ email: currentEmail }, { email: newEmail }, { new: true })
            .then(user => {
                let token = jwt.sign({
                    _id: user._id,

                    email: user.email,

                    companies: user.companies
                }, 'SECRET', { expiresIn: '100h' })

                res.status(200).json({
                    message: 'Updated Successfully',
                    transaction: user,
                    token: `Bearer ${token}`
                })
            })
            .catch(error => serverError(res, error))

    },
    updatePassword(req, res) {
        let { currentPassword, newPassword, confirmPassword } = req.body
        let validate = passwordValidator({ currentPassword, newPassword, confirmPassword })

        if (!validate.isValid) {
            return res.status(400).json(validate.error)
        }

        Profile.findOne({ email: req.user.email })
            // Use Populate for transaction
            .then(user => {
                console.log(user)
                if (!user) {
                    return resourceError(res, 'User Not Found')
                }
                bcrypt.compare(currentPassword, user.password, (err, result) => {
                    if (err) {
                        return serverError(res, err)
                    }
                    if (!result) {
                        return resourceError(res, 'Password Doesn\'t Match')
                    }
                    bcrypt.hash(newPassword, 11, (err, hash) => {
                        if (err) {
                            return resourceError(res, 'Server Error Occurred')
                        }
                        Profile.findOneAndUpdate({ email: req.user.email }, { password: hash }, { new: true })
                            .then(user => {
                                let token = jwt.sign({
                                    _id: user._id,

                                    email: user.email,

                                    companies: user.companies
                                }, 'SECRET', { expiresIn: '100h' })

                                res.status(200).json({
                                    message: 'Updated Successfully',
                                    transaction: user,
                                    token: `Bearer ${token}`
                                })
                            })
                            .catch(error => serverError(res, error))
                    })
                })
            })
            .catch(error => serverError(res, error))

        // Generate Token and Response Back
    },
    updateCompany(req, res) {
        let { _id, company_name, website, logo_url, short_description } = req.body
        Company.findOneAndUpdate({ _id }, { $set: { company_name, website, logo_url, short_description } }, { new: true })
            .exec()
            .then(result => {
                console.log(result)
            }).catch(error => serverError(res, error))
    },
    updateJob(req, res) {
        let { _id, company_id, company_name, website, logo_url, short_description,
            job_title, location, remote, job_type, salary, experience,
            apply_link, tags, description, discard } = req.body
        if (!discard) {
            Company.findOneAndUpdate({ _id: company_id }, { $set: { company_name, website, logo_url, short_description } }, { new: true })
                .exec()
                .then(result => {
                    console.log(result)
                }).catch(error => serverError(res, error))

            Jobpost.findOneAndUpdate({ _id }, {
                $set: {
                    job_title, location, remote, job_type, salary, experience,
                    apply_link, tags, description
                }
            }, { new: true })
                .exec()
                .then(result => {
                    console.log(result)
                    res.status(200).json({
                        result
                    })
                }).catch(error => serverError(res, error))
        }
        else {
            let company = new Company({
                profile: req.user._id, company_name, website, logo_url, short_description, jobposts: [_id]
            })
            company.save()
                .then(comp => {
                    Profile.findOneAndUpdate({ _id: req.user._id }, { $push: { companies: comp._id } }, { new: true })
                        .then(res => {

                        })
                        .catch(error => serverError(res, error))
                    Jobpost.findOneAndUpdate({ _id }, {
                        $set: {
                            company: comp._id, job_title, location, remote, job_type, salary, experience,
                            apply_link, tags, description
                        }
                    }, { new: true })
                        .exec()
                        .then(result => {
                            console.log(result)
                            res.status(200).json({
                                result
                            })
                        }).catch(error => serverError(res, error))
                })

        }
    }
}


