import React, { useState } from 'react'
import Axios from 'axios'
import jwtDecode from 'jwt-decode'
import setAuthToken from '../utils/setAuthToken'
import { Button } from 'semantic-ui-react'

export default function Profilechanger() {
    const [stateemail, setStateemail] = useState({ currentEmail: "", newEmail: "", confirmEmail: "" });
    const [statepass, setStatepass] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
    const onChangeEmailHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        setStateemail({ ...stateemail, [nam]: val });
    }


    const onChangePasswordHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        setStatepass({ ...statepass, [nam]: val });
    }
    const emailsubmitHandler = (e) => {
        e.preventDefault()
        Axios.put('http://localhost:4000/api/profile/update-email', stateemail)
            .then(res => {
                console.log(res)
                let token = res.data.token
                localStorage.setItem('auth_token', token)
                setAuthToken(token)
                let decode = jwtDecode(token)
                console.log(decode)
            })
            .catch(error => {
                console.log(error)
            })
    }
    const passwordsubmitHandler = (e) => {
        e.preventDefault()
        Axios.put('http://localhost:4000/api/profile/update-password', statepass)
            .then(res => {
                console.log(res)
                let token = res.data.token
                localStorage.setItem('auth_token', token)
                setAuthToken(token)
                let decode = jwtDecode(token)
                console.log(decode)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const { currentEmail, newEmail, confirmEmail } = stateemail;
    const { currentPassword, newPassword, confirmPassword } = statepass;
    return (
        <div className="profile-form">
            <form onSubmit={emailsubmitHandler}>
                <div className='email-change-form'>
                    <div className="quick-pick">
                        <div>
                            <span className="company-logo">c</span><span>Company</span>
                        </div>
                    </div>
                    <div className="email-change-wrapper">
                        <div className="current-email">
                            <p className="title">Current Email:</p>
                            <div className="ui input">
                                <input
                                    type="email"
                                    className='form-control'
                                    placeholder="Enter Amount"
                                    name='currentEmail'

                                    value={currentEmail}
                                    onChange={onChangeEmailHandler}
                                />
                            </div>
                        </div>
                        <div className="new-email">
                            <p className="title">New Email:</p>
                            <div className="ui input">
                                <input
                                    type="email"
                                    className='form-control'
                                    placeholder=""
                                    name='newEmail'
                                    value={newEmail}
                                    onChange={onChangeEmailHandler}
                                />
                            </div>
                        </div>
                        <div className="confirm-email">
                            <p className="title">Confirm Email:</p>
                            <div className="ui input">
                                <input
                                    type="email"
                                    className='form-control'
                                    placeholder=""
                                    name='confirmEmail'
                                    value={confirmEmail}
                                    onChange={onChangeEmailHandler}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="email-submit">
                        <Button type="submit" primary>Update Email</Button>
                    </div>
                </div>
            </form>
            <form onSubmit={passwordsubmitHandler}>
                <div className='password-change-form'>
                    <div className="quick-pick">
                        <div>
                            <span className="company-logo">c</span><span>Company</span>
                        </div>
                    </div>
                    <div className="password-change-wrapper">
                        <div className="current-password">
                            <p className="title">Current Passwod:</p>
                            <div className="ui input">
                                <input
                                    type="password"
                                    className='form-control'
                                    placeholder="Enter Amount"
                                    name='currentPassword'
                                    value={currentPassword}
                                    onChange={onChangePasswordHandler}
                                />
                            </div>
                        </div>
                        <div className="new-password">
                            <p className="title">New Password</p>
                            <div class="ui input">
                                <input
                                    type="password"
                                    className='form-control'
                                    placeholder=""
                                    name='newPassword'
                                    value={newPassword}
                                    onChange={onChangePasswordHandler}
                                />
                            </div>
                        </div>
                        <div className="confirm-password">
                            <p className="title">Confirm Password</p>
                            <div class="ui input">
                                <input
                                    type="password"
                                    className='form-control'
                                    placeholder="Enter Amount"
                                    name='confirmPassword'
                                    value={confirmPassword}
                                    onChange={onChangePasswordHandler}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="password-submit">
                        <Button type="submit" primary>Update Password</Button>
                    </div>
                </div>
            </form>
        </div>
    )
}
