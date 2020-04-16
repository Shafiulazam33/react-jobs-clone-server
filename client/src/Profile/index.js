import React, { useState, useEffect } from 'react'
import {Switch,Route,Link,useParams,useRouteMatch} from "react-router-dom";
import Profilechanger from '../Profile/Profilechanger';
import Jobs from  '../Profile/Jobs'
import Companies from '../Profile/Companies'
export default function Profile() {
    let { path, url } = useRouteMatch();
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
