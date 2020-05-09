import React, { useState, useEffect } from 'react'
import { useHistory, Switch, Route, Link, useRouteMatch } from "react-router-dom";
import Axios from 'axios'
import Profilechanger from '../Profile/Profilechanger';
import Jobs from '../Profile/Jobs'
import Companies from '../Profile/Companies'
import '../Profile/Profile.css'
import { Input, Label, Menu, Icon } from 'semantic-ui-react'
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
    let history = useHistory();
    console.log("ljj")
    console.log(stateCompany)
    console.log(stateJob)
    console.log("jj")
    return (
        <div className="profile-wrapper">
            <Switch>
                <Route exact path="/profile" component={Profilechanger} />
                <Route path={`${path}/jobs`}
                    render={() =>
                        <Jobs data={stateJob} com={stateCompany} />}
                />

                <Route path={`${path}/companies`} render={() => <Companies data={stateCompany} />} />
            </Switch>
            <ul className="ul-profile">
                <Menu size='large' vertical>
                    <Menu.Item
                        name='inbox'
                        active
                    >
                        <Label style={{ background: "inherit" }}><Icon color='teal' name="user"></Icon></Label>
                        <Link to="/profile"><li>Profile</li></Link>
                    </Menu.Item>


                    <Menu.Item
                        name='spam'
                    >
                        <Label style={{ background: "inherit" }}><Icon color='black' name="briefcase" /></Label>
                        <Label>{stateJob.length}</Label>
                        <Link to={{ pathname: `${url}/jobs` }}><li>Jobs</li></Link>
                    </Menu.Item>



                    <Menu.Item
                        name='updates'
                    >
                        <Label style={{ background: "inherit" }}><Icon color='black' name="copyright" /></Label>
                        <Label>{stateCompany.length}</Label>
                        <Link to={{ pathname: `${url}/companies` }}><li>Companies</li></Link>
                    </Menu.Item>
                    <Menu.Item
                        name='updates'
                    >
                        <Label style={{ background: "inherit" }}><Icon color='black' name="sign-out"></Icon></Label>

                        <li style={{ cursor: "pointer" }} onClick={() => {
                            localStorage.removeItem('auth_token');
                            history.push('/')
                            window.location.reload();
                            //history.push('/')
                        }}>Sign Out</li>
                    </Menu.Item>
                </Menu>
            </ul>
        </div>
    )
}









