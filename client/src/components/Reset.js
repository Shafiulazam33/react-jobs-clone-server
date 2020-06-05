import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Axios from 'axios'
import jwtDecode from 'jwt-decode'
import setAuthToken from '../utils/setAuthToken'
import { Button, Message } from 'semantic-ui-react'
import './Signin.css'

export default function Resest() {
    const [state, setState] = useState({ email: "" });
    const [message, setMessage] = useState(null);
    const [error, setError] = useState("");
    const myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;

        setState({ ...state, [nam]: val });
    }

    const SubmitHandler = (e) => {
        e.preventDefault();
        if (!state.email) {
            setError("Insert Your Email")
        }
        console.log("aaaa55")
        Axios.post('http://localhost:4000/api/profile/have-email', state)
            .then((res) => {
                console.log(res)

                if (res.data.email === state.email) {
                    setMessage(<Message info>
                        <Message.Header>Was this what you wanted?</Message.Header>
                        <p>Did you know it's been a while?</p>
                    </Message>)
                }
                else {
                    setMessage(<Message warning>
                        <Message.Header>Confirm  Your Email</Message.Header>
                        <p>Visit Your Email, then try again.</p>
                    </Message>)
                }

            })
            .catch(error => {
                console.log("j", error.response.data.message)
                setMessage(<Message warning>
                    <Message.Header>Confirm  Your Email</Message.Header>
                    <p>Visit Your Email, then try again.</p>
                </Message>)
            })

    }
    let history = useHistory();
    return (
        <div className="signin-form-wrapper">
            {message}
            <div className="signin-form">
                <form onSubmit={SubmitHandler}>
                    <h1>Resest your password</h1>
                    <div className="email-input-wrapper">
                        <p class="title">Email</p>
                        <div class="ui input"><input name="email" type="email" onChange={myChangeHandler} value={state.email} />
                            <p>{error}</p>
                        </div>
                    </div>
                    <Button color='teal'>Submit</Button>
                </form>
            </div>
        </div>

    )
}
