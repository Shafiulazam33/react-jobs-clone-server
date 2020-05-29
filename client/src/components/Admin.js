import React, { useState, useEffect, useRef } from 'react'
import Axios from 'axios'
import jwtDecode from 'jwt-decode'
import StripeCheckout from 'react-stripe-checkout';
import { Icon } from 'semantic-ui-react'
import './Admin.css'
import Pagination from "react-js-pagination";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch,
    useHistory
} from "react-router-dom";

const Admin = (props) => {
    const [data, setData] = useState({ jobs: [], email: [] });
    const [activePage, setActivePage] = useState(1);
    const [dataLength, setDataLength] = useState(null);
    const [pageRange, setPageRange] = useState(5);
    const [dataPerPage, setDataPerPage] = useState(10);
    const [displayNone, setDisplayNone] = useState("");
    console.log(data, "e")
    useEffect(() => {
        Axios.get('http://localhost:4000/api/job/find-featured-post') //https://jsonplaceholder.typicode.com/todos'
            .then((res) => {
                console.log(res.data)
                setData({ jobs: res.data.jobs, email: res.data.prof })
                setDataLength(res.data.jobs.length)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])
    const handlePageChange = (activePage) => {
        console.log(`active page is ${activePage}`);
        // this.setState({ activePage: activePage });
    }
    const funcPageData = () => {

        let row = [];
        console.log("va", activePage, dataPerPage)
        for (let i = (activePage - 1) * dataPerPage; i < (activePage * dataPerPage); i++) {
            console.log("va", i)
            if (i == data.jobs.length) {
                break;
            }
            row.push(<tr>
                <td>
                    {data.jobs[i]._id}
                </td>
                <td>
                    {data.email[i].email}
                </td>
                <td>
                    {data.jobs[i].featured.featured_created_at}
                </td>
                <td>
                    {data.jobs[i].featured.featured_expired_at}
                </td>
                <td>
                    <input className="off-button" id={data.jobs[i]._id} type="button" value="OFF" onClick={(e) => console.log(e.target.id)} />
                </td></tr>)
        }
        return row
    }
    const funcPageClick = (i) => {
        setActivePage(i)
    }
    const funcPage = () => {
        let page = (activePage - 2) <= 0 ? 1 : activePage - 2
        let range = Math.ceil(dataLength / dataPerPage)
        range = (range >= page + 4) ? (page + 4) : range
        console.log(page, range, dataLength, dataPerPage)
        let list = [];
        let cls;
        for (let i = page; i <= range; i++) {

            if (activePage === i) { cls = "blue"; } else { cls = "" }
            console.log("a", activePage, "b", i)
            list.push(<li key={i} id={i} className={"pagination" + " " + cls} onClick={() => funcPageClick(i)}>{i}</li>)
            console.log(list)
        }
        return list
    }
    const funcRow = (e) => {
        if (e.key === "Enter") {
            setDataPerPage(Number(e.target.value));
            setActivePage(1);
        }
    }
    if (data.jobs.length > 0) {
        return (
            <div className="dashboard-wrapper">
                <div className="side-left">
                    <div className="dashboard-menu"><p>Menu</p><p><Icon name="bars" className="white" onClick={() => { (!displayNone) ? setDisplayNone("display-none") : setDisplayNone("") }} /></p></div>
                    <ul className={displayNone}>
                        <li>
                            <Link>
                                <img className="dashboard-icon" src="/images/iconfinder_pie-chart_322488.png" />
                                <span>Google Analytics</span>
                            </Link>
                        </li>
                        <li>
                            <Link>
                                <img className="dashboard-icon" src="/images/iconfinder_table_1608863.png" />
                                <span>Featured Tables</span>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="side-right">
                    <table>
                        <tr>
                            <th>
                                Job Id
                    </th>
                            <th>
                                Email
                    </th>
                            <th>
                                Featured At
                    </th>
                            <th>
                                Featured Experider At
                    </th>
                            <th>
                                Featured Off
                    </th>
                        </tr>
                        {funcPageData()}
                    </table>
                    <div className="pagination-wrapper">
                        <div><input type="Number" className="pagination-input" onKeyPress={
                            funcRow
                        } /> Of Rows Per Page</div>
                        <div>Go To The Page<input className="pagination-input" type="Number" onKeyPress={(e) => (e.key === "Enter") ? setActivePage(Number(e.target.value)) : ""} /></div>
                        <ul>
                            {
                                (activePage >= 2) ? <li className="pagination pag-arrow-left" onClick={() => setActivePage(activePage - 1)}>‹</li> : ""
                            }
                            {funcPage()}
                            {
                                (activePage <= Math.ceil(dataLength / dataPerPage) - 2) ? <li className="pagination pag-arrow-right" onClick={() => setActivePage(activePage + 1)}>›</li> : ""
                            }
                        </ul>
                    </div>
                </div>
            </div>
        )
    } else {
        return (<> </>)
    }
}
export default Admin;