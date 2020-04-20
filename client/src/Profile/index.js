import React, { useState, useEffect } from 'react'
import {useLocation, Switch, Route, Link, useParams, useRouteMatch } from "react-router-dom";
import Axios from 'axios'
import Profilechanger from '../Profile/Profilechanger';
import Jobs from '../Profile/Jobs'
import Companies from '../Profile/Companies'
export default function Profile() {
    /*const [stateCompany, setStateCompany] = useState({company_name: "", website: "", logo_url: "", short_description: ""
    })
    const [stateJobs, setStateJobs] = useState({job_title: "", location: "", remote: "", job_type: "", salary: "", experience: "",
    apply_link: "", tags: "", description: ""})*/
    const [stateCompany, setStateCompany] = useState([])
    const [stateJob, setStateJobs] = useState([])
    let { path, url } = useRouteMatch();
    useEffect(() => {
        Axios.get('http://localhost:4000/api/job/companies')
            .then((res) => {

                console.log(res)
                setStateCompany(res.data.companies)
                setStateJobs(res.data.jobposts)
                // console.log(stateJobs)
                //history.push('/login')*/
            })
            .catch(error => {
                //console.log(error.response.data)
                //setError(error.response.data);
            })
    }, []);
    return (
        <div>
            <Switch>
                <Route exact path={path} component={Profilechanger} />
                <Route path={`${path}/jobs`} component={Jobs} />
                <Route path={`${path}/companies`} component={Companies} />
            </Switch>
            <ul>
                <Link to="/profile"><li>Profile</li></Link>
                <Link to={{ pathname:`${url}/jobs`, data: stateJob ,com:stateCompany}}><li>Jobs{stateJob.length}</li></Link>
                <Link to={{ pathname:`${url}/companies`, data: stateCompany  }}><li>Companies{stateCompany.length}</li></Link>
                <Link to="signin"><li>Sign Out</li></Link>
            </ul>
        </div>
    )
}


