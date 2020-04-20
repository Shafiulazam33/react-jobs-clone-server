import React from 'react'
import { useLocation, Link } from "react-router-dom";
export default function Companies() {
    let { data } = useLocation();
    console.log(data)
    return (
        <div>
            111 Companies
            {
                (data) ?
                    data.map((value, index) => {
                        return (
                            <>
                                <p key={value._id}>{value.company_name}</p>
                                <Link to={{ pathname:`/company/${value._id}/edit`, data: value }}>Edit</Link>
                            </>
                        )
                    }) : ""
            }
        </div>
    )
}
                                
