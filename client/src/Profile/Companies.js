import React from 'react'
import { useLocation, Link } from "react-router-dom";
import { Icon, Button } from 'semantic-ui-react'
import '../Profile/Companies.css'
export default function Companies() {
    let { data } = useLocation();
    console.log(data)
    return (
        <>
            111 Companies
            {
                (data) ?
                    data.map((value, index) => {
                        return (
                            <>
                                <p key={value._id}>{value.company_name}</p>
                                <Link to={{ pathname: `/company/${value._id}/edit`, data: value }}>Edit</Link>
                            </>
                        )
                    }) : ""
            }
            <ul className="jobs-list">
                <li>
                    <div className="company-list-wrapper">
                        <img alt="" src="iconfinder_user-01_186382.png" className="company-logo" />
                        <div className="company-list">
                            <div className="company-list-title"><Icon name="chart area" />dcfvgbgftguhyug</div>
                            <p className="line1"></p>
                            <div className="edit-button">
                                <Button primary>Edit</Button>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </>
    )
}

