import React, { useState} from 'react'
import Axios from 'axios'
import jwtDecode from 'jwt-decode'
import setAuthToken from '../utils/setAuthToken'

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
        <div>
            <form onSubmit={emailsubmitHandler}>
                <div className='form-group'>
                    <label htmlFor='amount'> Amount: </label>
                    <input
                        type="email"
                        className='form-control'
                        placeholder="Enter Amount"
                        name='currentEmail'
                        
                        value={currentEmail}
                        onChange={onChangeEmailHandler}
                    />
                    <input
                        type="email"
                        className='form-control'
                        placeholder="Enter Amount"
                        name='newEmail'
                        
                        value={newEmail}
                        onChange={onChangeEmailHandler}
                    />
                    <input
                        type="email"
                        className='form-control'
                        placeholder="Enter Amount"
                        name='confirmEmail'
                        
                        value={confirmEmail}
                        onChange={onChangeEmailHandler}
                    />
                    <input
                        type="submit"
                        value="Update email"
                    />
                </div>
            </form>
            <form onSubmit={passwordsubmitHandler}>
                <div className='form-group'>
                    <label htmlFor='amount'> Change password </label>

                    <input
                        type="password"
                        className='form-control'
                        placeholder="Enter Amount"
                        name='currentPassword'
                        
                        value={currentPassword}
                        onChange={onChangePasswordHandler}
                    />

                    <input
                        type="password"
                        className='form-control'
                        placeholder="Enter Amount"
                        name='newPassword'
                        
                        value={newPassword}
                        onChange={onChangePasswordHandler}
                    />
                    <input
                        type="password"
                        className='form-control'
                        placeholder="Enter Amount"
                        name='confirmPassword'
                        
                        value={confirmPassword}
                        onChange={onChangePasswordHandler}
                    />
                    <input
                        type="submit"
                        value="Update email"
                    />
                </div>
            </form>
        </div>
    )
}
