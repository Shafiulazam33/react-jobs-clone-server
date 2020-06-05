import React from 'react'
import { useLocation, Link } from "react-router-dom";
import { Icon, Button } from 'semantic-ui-react'
import '../Profile/Companies.css'
export default function Companies(props) {
    //let { data } = useLocation();
    console.log('data')
    console.log(props.data)
    return (
        <>
            <ul className="ul-company-list">
                {
                    (props.data) ?
                        props.data.map((value, index) => {
                            return (
                                <>
                                    <li key={value._id}>
                                        <div className="company-list-wrapper">
                                            <img alt="" src="iconfinder_user-01_186382.png" className="company-logo" />
                                            <div className="company-list">
                                                <div className="company-list-title"><Icon name="chart area" />{value.company_name}</div>
                                                <p className="line1"></p>
                                                <div className="edit-button">
                                                    <Link className="ui primary button" to={{ pathname: `/company/${value._id}/edit`, data: value }}>Edit</Link>
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

