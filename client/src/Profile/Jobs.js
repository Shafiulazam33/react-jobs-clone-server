import React from 'react'
import { useLocation, Link } from "react-router-dom";
import { Icon, Label, Button, Checkbox } from 'semantic-ui-react'
import '../Profile/Jobs.css'
export default function Jobs() {
    let { data, com } = useLocation();
    console.log(data)
    console.log(com)
    return (
        <>

            <ul className="jobs-list">
                <li className="company-post-wrapper">
                    <div className="company-post">
                        <img alt="" src="iconfinder_user-01_186382.png" className="company-logo" />
                        <div className="job-details">
                            <div className="job-position-type">
                                <p>
                                    <span className="job-position">Customer Admin Support</span>
                                    <span className="job-slary"><Icon name="money bill alternate outline"></Icon> 25000$-4000$</span>
                                </p>
                                <p><Icon name="info circle"></Icon><span className="job-type">Part-Time</span></p>
                            </div>
                            <div className="company-name-location">
                                <p className="company-name"><Icon name="chart area" />Daiwa House group</p>
                                <p className="company-location"><Icon name="location arrow" />San Francisco, CA, United States <span className="remote"><Icon name="home" />Remote</span></p>
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
                                <Button primary>Edit</Button>
                                <Button primary>Promote</Button>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </>
    )
}