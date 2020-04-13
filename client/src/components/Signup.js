import React from 'react'
import  { useState,useRef,useEffect } from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios'
export default function Signup() {
    const [state, setState] = useState({ email: "", password: "",confirmPassword:"",checked:false });
    const [error, setError] = useState({});
    const inputEl = useRef(null);
    useEffect(
        () => {
          if(state.checked)
          {
              inputEl.current.disabled=false
          } else {inputEl.current.disabled=true}
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
    const checkboxHandler=()=>{
if (state.checked) {
    setState({ ...state, checked:false });
} else {
    setState({ ...state, checked:true });
}
 }
    return (
        <div>
            <form onSubmit={SubmitHandler}>
            <p>Create your account</p>
        Email <input name="email" onChange={myChangeHandler} value={state.email} />
       { error.email && <p>{error.email}</p>}
        password <input name="password" onChange={myChangeHandler} value={state.password} />
        { error.password && <p>{error.password}</p>}
        confirm password <input name="confirmPassword" onChange={myChangeHandler} value={state.confirmpassword} />
        { error.confirmPassword && <p>{error.confirmPassword}</p>}
        <input type="checkbox" onClick={checkboxHandler}/>
        <input type="submit" ref={inputEl} value="Sign up"/>
        </form>
            Already Have An Account <Link to="/signin">Sign In</Link>
        </div>

    )
}
