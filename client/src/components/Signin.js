import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
export default function Signin() {
    const [state, setState] = useState({ email: "", password: "" });
    const myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;

        setState({ ...state, [nam]: val });
    }
   
    const SubmitHandler = () => {
      

    }
    return (
        <div>
            <p>Sign In</p>
        Email <input name="email" onChange={myChangeHandler} value={state.email} />
        password <input name="password" onChange={myChangeHandler} value={state.password} />
        <input type="submit" onSubmit={SubmitHandler} value="Sign in"/>
            Dont Have An Account <Link to="/signup"><p>Create account</p></Link>
        </div>
        )
}
