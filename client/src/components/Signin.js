import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Axios from 'axios'
import jwtDecode from 'jwt-decode'
import setAuthToken from '../utils/setAuthToken'
import { Button } from 'semantic-ui-react'
import './Signin.css'

export default function Signin() {
    const [state, setState] = useState({ email: "", password: "" });
    const [error, setError] = useState({});
    const myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;

        setState({ ...state, [nam]: val });
    }

    const SubmitHandler = (e) => {
        e.preventDefault();
        console.log("aaaa55")
        Axios.post('http://localhost:4000/api/profile/login', state)
            .then((res) => {

                console.log(res)
                let token = res.data.token
                localStorage.setItem('auth_token', token)
                setAuthToken(token)
                let decode = jwtDecode(token)
                if (decode.isAdmin === true) {
                    history.push('/admin')
                }
                else {
                    history.push('/')
                    window.location.reload();
                }

            })
            .catch(error => {
                //console.log(error.response.data)
                //setError(error.response.data);
            })

    }
    let history = useHistory();
    return (
        <div className="signin-form-wrapper">
            <div className="signin-form">
                <form onSubmit={SubmitHandler}>
                    <h1>Sign In</h1>
                    <div className="email-input-wrapper">
                        <p class="title">Email</p>
                        <div class="ui input"><input name="email" onChange={myChangeHandler} value={state.email} />
                            {error.email && <p>{error.email}</p>}
                        </div>
                    </div>
                    <div className="password-input-wrapper">
                        <p class="title">Password</p>
                        <div class="ui input"><input name="password" onChange={myChangeHandler} value={state.password} />
                            {error.password && <p>{error.password}</p>}
                        </div>
                    </div>
                    <Button color='teal'>Sign in</Button>
                </form>
            </div>
            <div className="account-link">
                Dont Have An Account<br></br>
                <Link to="/signup"><p>Create account</p></Link>
            </div>
        </div>

    )
}
