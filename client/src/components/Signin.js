import React from 'react'
import { useState, useEffect } from 'react'
import { Link ,useHistory} from 'react-router-dom'
import Axios from 'axios'
import jwtDecode from 'jwt-decode'
import setAuthToken from '../utils/setAuthToken'

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
                console.log(decode)
                history.push('/')
                window.location.reload();
                
            })
            .catch(error => {
                //console.log(error.response.data)
                //setError(error.response.data);
            })

    }
    let history = useHistory();
    return (
        <div>
            <form onSubmit={SubmitHandler}>
                <p>Sign In</p>
        Email <input name="email" onChange={myChangeHandler} value={state.email} />
                {error.email && <p>{error.email}</p>}
        password <input name="password" onChange={myChangeHandler} value={state.password} />
                {error.password && <p>{error.password}</p>}
                <input type="submit" value="Sign in" />
            </form>
            Dont Have An Account <Link to="/signup"><p>Create account</p></Link>
        </div>

    )
}
