import React from 'react'
import  { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
export default function Signup() {
    const [state, setState] = useState({ email: "", password: "",confirmpassword:"",checked:false });
    const myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;

        setState({ ...state, [nam]: val });
    }
   
    const SubmitHandler = () => {
      

    }
    const checkboxHandler=()=>{
if (state.checked) {
    setState({ ...state, checked:false });
} else {
    setState({ ...state, checked:true });
}

    }
    return (
        <div>
            <p>Create your account</p>
        Email <input name="email" onChange={myChangeHandler} value={state.email} />
        password <input name="password" onChange={myChangeHandler} value={state.password} />
        confirm password <input name="confirmpassword" onChange={myChangeHandler} value={state.confirmpassword} />
        <input type="checkbox" onClick={checkboxHandler}/>
        <input type="submit" onSubmit={SubmitHandler} value="Sign up"/>
          
            Already Have An Account <Link to="/signin">Sign In</Link>
        </div>

    )
}
