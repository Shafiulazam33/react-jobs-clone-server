import React from 'react'
import { useLocation, Link } from "react-router-dom";
export default function Jobs() {
    let { data, com } = useLocation();
    console.log(data)
    console.log(com)
    return (
        <div>
            111 Jobs
            {
                (data) ?
                    data.map((value, index) => {
                        let {company_name} = com.find((val) => val._id === value.company)
                        return (
                            <>
                                <p key={value._id}>{company_name}</p>
                                {value.job_title}..{value.company_name}..{value.job_type}..{value.location}
                                <Link to={{ pathname: `/company/${value._id}/edit`, data: value }}>Edit</Link>
                            </>
                        )
                    }) : ""
            }
        </div>
    )
}