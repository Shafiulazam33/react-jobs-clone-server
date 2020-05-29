import React from 'react'
import { useLocation, Link } from "react-router-dom";
import { Icon, Label, Button, Checkbox } from 'semantic-ui-react'
import '../Profile/Jobs.css'
export default function Jobs(props) {
    let { data, com } = props;
    console.log(data, com)
    return (
        <>
            <ul className="jobs-list">
                {
                    (data) ?
                        data.map((value, index) => {
                            let { company_name } = com.find((val) => val._id === value.company)
                            return (
                                <>
                                    <Link onClick={(e) => e.stopPropagation()} to={{ pathname: `/job/${value._id}`, id: { _id: value._id } }}>
                                        <li key={value._id} className="company-post-wrapper">
                                            <div className="company-post">
                                                <img alt="" src="//logo.clearbit.com/spotify.com" className="company-logo" />
                                                <div className="job-details">
                                                    <div className="job-position-type">
                                                        <p>
                                                            <span className="job-position">{value.job_title}</span>
                                                            <span className="job-slary"><Icon name="money bill alternate outline"></Icon> 25000$-4000$</span>
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
                                                        <li><Label>React</Label></li>
                                                        <li><Label>Flux</Label></li>
                                                        <li><Label>Redux</Label></li>
                                                    </ul>
                                                    <p className="line2"></p>
                                                    <div className="listed-edit-promote">
                                                        <div className="listed">
                                                            <Checkbox toggle />
                                                            <p>Listed</p>
                                                        </div>
                                                        <Link onClick={(e) => e.stopPropagation()} to={{ pathname: `/job/${value._id}/edit`, data: value }}><Button primary>Edit</Button></Link>
                                                        <Link to={{ pathname: `/featured/${value._id}`, data: value }}><Button primary>Promote</Button></Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </Link>
                                </>
                            )
                        }) : ""
                }
            </ul>
        </>
    )
}