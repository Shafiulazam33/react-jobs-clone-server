import React, { useState, useEffect } from 'react'
import {Switch,Route,Link,useParams,useRouteMatch} from "react-router-dom";
import Axios from 'axios'
import Profilechanger from '../Profile/Profilechanger';
import Jobs from  '../Profile/Jobs'
import Companies from '../Profile/Companies'
export default function Profile() {
    let { path, url } = useRouteMatch();
    useEffect(() => {
        Axios.get('http://localhost:4000/api/job/companies')
        .then((res) => {
            
            console.log(res)
            //history.push('/login')
        },[])
        .catch(error => {
            console.log(error.response.data)
            //setError(error.response.data);
            })
      });
    return (
        <div>
      <Switch>
        <Route exact path={path} component={Profilechanger}/>
         
        <Route path={`${path}/jobs`} component={Jobs}/>
        <Route path={`${path}/companies`} component={Companies}/>
         
      </Switch>
            <ul>
                <Link to="/profile"><li>Profile</li></Link>
                <Link to={`${url}/jobs`}><li>Jobs</li></Link>
                <Link to={`${url}/companies`}><li>Companies</li></Link>
                <Link to="signin"><li>Sign Out</li></Link>
            </ul>
        </div>
    )
}
