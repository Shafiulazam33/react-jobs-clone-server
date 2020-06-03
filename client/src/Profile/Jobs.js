
import React, { useState, useEffect } from 'react'
import { useLocation, useHistory, Link } from "react-router-dom";
import { Icon, Label, Button, Checkbox } from 'semantic-ui-react'
import Axios from 'axios'
import '../Profile/Jobs.css'
export default function Jobs(props) {
    let _id, checkk
    let { data, com } = props;
    console.log(data, com)
    const [statedata, setData] = useState(false)
    useEffect(() => {
        setTimeout(
            function () {
                console.log("ammu:"); setData(true)
            }
                .bind(this),
            3000
        );

    }, [])
    const funcCheckbox = (val, ind) => {
        console.log(ind, val)
        funcList(null, ind.checked)
    }
    const funcCh = (val) => {
        console.log("abbu")
        if (!statedata) {
            if (val) { return true }
            else {
                return false
            }
        }
    }
    const funcList = (id, check) => {
        console.log(_id, check)
        if (id != null) {
            _id = id
        }
        else {
            if (check === true) {
                Axios.put(`http://localhost:4000/api/profile/update-job`, { _id, islisted: true })
                    .then(res => {
                        console.log(res)
                        setData(true)
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }
            else {
                Axios.put(`http://localhost:4000/api/profile/update-job`, { _id, islisted: false })
                    .then(res => {
                        console.log(res)
                        setData(true)
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }
        }

    }
    let history = useHistory()
    return (
        <>
            <ul className="jobs-list">
                {
                    (data) ?
                        data.map((value, index) => {
                            let { company_name } = com.find((val) => val._id === value.company)
                            return (
                                <>

                                    <li key={value._id} className="company-post-wrapper" onClick={(e) => { e.stopPropagation(); history.push(`/job/${value._id}`) }}>
                                        <div className="company-post">
                                            <img alt="" src="//logo.clearbit.com/spotify.com" className="company-logo" />
                                            <div className="job-details">
                                                <div className="job-position-type">
                                                    <p>
                                                        <span className="job-position">{value.job_title}</span>
                                                        <span className="job-slary"><Icon name="money bill alternate outline"></Icon>{value.salary}</span>
                                                    </p>
                                                    <p className="job-type"><Icon name="info circle"></Icon><span>{value.job_type}</span></p>
                                                </div>
                                                <div className="company-name-location">
                                                    <p className="company-name"><Icon name="chart area" />{company_name}</p>
                                                    <p className="company-location"><Icon name="location arrow" />{value.location.location_name}<span className="remote"><Icon name="home" />Remote</span></p>
                                                </div>
                                                <p className="company-post-time"><Icon name="clock outline" />posted a month ago</p>
                                                <p className="line1"></p>
                                                <ul className="ul job-tags">
                                                    {
                                                        value.tags.map((val, index) => {
                                                            return (<li key={index}><Label>{val}</Label></li>)
                                                        })
                                                    }
                                                </ul>
                                                <p className="line2"></p>
                                                <div className="listed-edit-promote">
                                                    <div className="listed" onClick={(e) => e.stopPropagation()}>

                                                        <Checkbox checked={funcCh(value.islisted)}
                                                            onClick={(e) => { e.stopPropagation(); funcList(value._id, null) }} toggle onChange={funcCheckbox} />
                                                        <p>Listed</p>
                                                    </div>
                                                    <Link onClick={(e) => e.stopPropagation()} to={{ pathname: `/job/${value._id}/edit`, data: value }}><Button primary>Edit</Button></Link>
                                                    <Link onClick={(e) => e.stopPropagation()} to={{ pathname: `/featured/${value._id}`, data: value }}><Button primary>Promote</Button></Link>
                                                </div>
                                            </div>
                                        </div>
                                    </li>

                                </>
                            )
                        }) : ""
                }
            </ul>
        </>
    )
}