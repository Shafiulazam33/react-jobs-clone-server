import React from 'react'
import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios'
import { Button, Checkbox } from 'semantic-ui-react'
import './Signup.css'
export default function Signup() {
    const [state, setState] = useState({ email: "", password: "", confirmPassword: "", checked: false });
    const [error, setError] = useState({});
    const inputEl = useRef(null);
    useEffect(
        () => {
            if (state.checked) {
                inputEl.current.disabled = false
                inputEl.current.style.opacity = 1
            } else {
                inputEl.current.disabled = true
                inputEl.current.style.opacity = 0.7
            }
        },
        [state.checked],
    );
    const myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;

        setState({ ...state, [nam]: val });
    }

    const SubmitHandler = (e) => {
        e.preventDefault();
        console.log("aaaaaaaaaaa555")
        Axios.post('http://localhost:4000/api/profile/register', state)
            .then((res) => {
                console.log(res)

                //history.push('/login')
            })
            .catch(error => {
                console.log(error.response.data)
                setError(error.response.data);
            })
    }
    const checkboxHandler = () => {
        if (state.checked) {
            setState({ ...state, checked: false });
        } else {
            setState({ ...state, checked: true });
        }
    }
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
                    <div className="password-input-wrapper">
                        <p class="title">Confirm Password</p>
                        <div class="ui input"><input name="confirmPassword" onChange={myChangeHandler} value={state.confirmPassword} />
                            {error.confirmpassword && <p>{error.confirmpassword}</p>}
                        </div>
                    </div>
                    <Checkbox label='Make my profile visible' onClick={checkboxHandler} />
                    <br></br>
                    <input type="submit" class="submit-button" ref={inputEl} value="Sign Up" />
                </form>
            </div>

            <div className="account-link">
                Already Have An Account<br></br>
                <Link to="/sigin"><p>Sign In</p></Link>
            </div>
        </div>


    )
}
