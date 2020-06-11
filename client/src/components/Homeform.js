import React, { useState, useEffect, useRef } from 'react'
import Geosuggest from 'react-geosuggest';
import ReactDOM from 'react-dom'
import { Link, useParams } from "react-router-dom";
import './Homeform.css'
import Axios from 'axios';
import { Icon, Label, Checkbox, Message } from 'semantic-ui-react'

const quicklocations = ["San Francisco", "New York", "US", "London", "Berlin", "Singapore"]
const ipApis=["https://ip-geolocation.whoisxmlapi.com/api/v1?apiKey=at_4sNpj0U2toNHNXaMJfvClmSafV5vB","https://ip-geolocation.whoisxmlapi.com/api/v1?apiKey=at_7TASe6hC7vZETVoLcZVOESgoWJJE0"]
export default function Homeform() {
  const geosuggestEl = useRef(null);
  let { name } = useParams();
  const [stateMessage, setMessage] = useState(null)
  const [statedata, setData] = useState([])
  const [stateError, setError] =
    useState({
      error: false//vdH8KbhvFUP9hWf
    })
  const [state, setState] =
    useState({
      searchword: "", remote: false, quicklocation: ""
    })
  useEffect(() => {
    Axios.get(ipApis[Math.floor(Math.random() * 2)])
      .then(res => {
        console.log(res)
        let quicklocation
        if (res.data.location.country) {
          quicklocation =res.data.location.region +","+ res.data.location.region + "," + res.data.location.country
          setState({ ...state, quicklocation })
          setTimeout(
            function () {
              geosuggestEl.current.focus()
            },
            5000
          );
          setTimeout(
            function () {
              let item = document.getElementsByClassName("geosuggest__item");
              ReactDOM.findDOMNode(item[0]).click()
            },
            10000
          );
        }
        else {
          Axios.post('/api/job/jobs', { "featured.isfeatured": 1 })
            .then(res => {
              setData(res.data.jobs)
            })
            .catch(error => {
              console.log(error)
            })
        }
      })
      .catch(error => {
        console.log(error)
        Axios.post(`/api/job/jobs`, { "featured.isfeatured": 1 })
          .then(res => {
            setData(res.data.jobs)
          })
          .catch(error => {
            console.log(error)
          })
        setError({ error: true })
      })
  }, []);
  const onSuggestSelect = (suggest) => {
    if (!suggest) { return; }
    setData([])
    let location = {};
    let address = suggest.gmaps.address_components
    location.location_name = suggest.description
    location.place_id = suggest.gmaps.place_id
    address.map((value, index) => {
      if (value.types[0] === "country") {
        location.country = value.long_name;
      }
      else if (value.types[0] === "administrative_area_level_1") {
        location.admin_area1 = value.long_name;
      }
      else if (value.types[0] === "administrative_area_level_2") {
        location.admin_area2 = value.long_name;
      }
    }
    )
    setMessage(<Message icon>
      <Icon name='circle notched' loading />
      <Message.Content>
        <Message.Header>Wait Please...</Message.Header>
      We are fetching that {location.location_name} for you.
    </Message.Content>
    </Message>)
    Axios.post(`/api/job/jobs`, { "location.place_id": location.place_id })
      .then(res => {
        if (res.data.jobs.length < 1) {
          Axios.post(`/api/job/jobs`, { "location.admin_area1": location.admin_area1 || location.country })
            .then(res => {
              if (res.data.jobs.length < 1) {
                Axios.post(`/api/job/jobs`, { "location.admin_area2": location.admin_area2 || location.country })
                  .then(res => {
                    if (res.data.jobs.length < 1) {
                      Axios.post(`/api/job/jobs`, { "location.country": location.country })
                        .then(res => {
                          if (res.data.jobs.length < 1) {
                            setMessage(<Message warning>
                              <Message.Header>Oh Sorry!</Message.Header>
                              <p>No result was found for location {location.location_name}</p>
                            </Message>)
                          }
                          else {
                            setMessage(<Message warning>
                              <Message.Header>Oh Sorry!</Message.Header>
                              <p>No result was found for location {location.location_name} ,so we tried for {location.country}</p>
                            </Message>)
                            setData(res.data.jobs)
                          }
                        })
                        .catch(error => {
                          console.log(error)
                        })
                    }
                    else {

                      setMessage(<Message warning>
                        <Message.Header>Oh Sorry!</Message.Header>
                        <p>No result was found for location {location.location_name} ,so we tried for {location.admin_area2}</p>
                      </Message>)
                      setData(res.data.jobs)
                    }
                  })
                  .catch(error => {
                    console.log(error)
                  })
              }
              else {
                setMessage(<Message warning>
                  <Message.Header>Oh Sorry!</Message.Header>
                  <p>No result was found for location {location.location_name} ,so we tried for {location.admin_area1}</p>
                </Message>)
                setData(res.data.jobs)
              }
            })
            .catch(error => {
              console.log(error)
            })
        }
        else {
          setMessage(null)
          setData(res.data.jobs)
        }
      })
      .catch(error => {
        console.log(error)
      })
  }
  const funcCheckbox = (ind, val) => {
    if (val.checked === true) {
      geosuggestEl.current.update("")
      setMessage(null)
      Axios.post(`/api/job/jobs`, { remote: "Yes" })
        .then(res => {
          setData(res.data.jobs)
        })
        .catch(error => {
          console.log(error)
        })
    } else {
      geosuggestEl.current.update("")
      setData([])
      setMessage(<Message info>
        <Message.Header>Please</Message.Header>
        <p>Enter Your Location Or Search Remote Job</p>
      </Message>)
    }
  }
  const QuickLocationSearch = (loc) => {
    geosuggestEl.current.update(loc)
    setTimeout(
      function () {
        geosuggestEl.current.focus()
      },
      2000
    );

    setTimeout(
      function () {
        let item = document.getElementsByClassName("geosuggest__item");
        ReactDOM.findDOMNode(item[0]).click()
      },
      4000
    );
  }

  const date_diff_indays = (date1) => {
    let dt1 = new Date(date1);
    let dt2 = new Date();
    let dt = Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60 * 60 * 24));
    if (dt === 0) {
      return "Posted Today"
    }
    else {
      return "Posted " + dt + " days ago"
    }
  }

  return (
    <div className="search-list">
      <div className="search-wrapper">
        <div className="searchbox-background">
          <div className="searchbox">
            <h3>Search for a Job or post your Job offer (for <span className="free">free</span>!) in minutes.</h3>
            <Geosuggest
              ref={geosuggestEl}
              placeholder="Enter Location"
              initialValue={(state.quicklocation) ? state.quicklocation : ""}
              queryDelay="2500"
              onSuggestSelect={onSuggestSelect}
              location={new window.google.maps.LatLng(null, null)}
              radius="20" />
            <div className="remote-check"><Checkbox toggle onChange={funcCheckbox} />
              <p>I'm looking for remote jobs</p>
            </div>
            <div className="horizontal-line" id="z-index0">
              <div className="quick-pick">QUICK PICK</div>
            </div>
            <ul className="form-ul">
              {
                quicklocations.map((item, index) => {
                  return (<><li key={index}><Link onClick={() => QuickLocationSearch(item)} to="">{item}</Link></li></>)
                }
                )
              }
            </ul>
          </div>
        </div>
        {(!name) && (stateError.error)
        }

      </div >
      {stateMessage}
      <ul>
        {

          (statedata) ?
            statedata.map((value, index) => {
              return (
                <>
                  <Link className="jobs-link" onClick={(e) => e.stopPropagation()} to={{ pathname: `/job/${value._id}`, id: { _id: value._id } }}>
                    <li key={value._id} className="company-post-wrapper">

                      {(value.featured.isfeatured) ? <div className="sticker">Featured Job</div> : ""}
                      <div className="company-post">
                        <img alt="" src={value.company.logo_url} />
                        <div className="job-details">
                          <div className="job-position-type">
                            <p>
                              <span className="job-position">{value.job_title}</span>
                              <span className="job-slary"><Icon name="money bill alternate outline"></Icon>{value.salary}</span>
                            </p>
                            <p className="job-type"><Icon name="info circle"></Icon><span>{value.job_type}</span></p>
                          </div>
                          <div className="company-name-location">
                            <p className="company-name"><Icon name="chart area" />{value.company.company_name}</p>
                            <p className="company-location"><Icon name="location arrow" />{value.location.location_name}{(value.remote === "Yes") && <span className="remote"><Icon name="home" />Remote</span>}</p>
                          </div>
                          <p className="company-post-time"><Icon name="clock outline" />
                            {date_diff_indays(value.createdAt)}</p>
                          <p className="line1"></p>
                          <ul className="ul job-tags">
                            {
                              value.tags.map((val, index) => {
                                return (<li key={index}><Label>{val}</Label></li>)
                              })
                            }
                          </ul>
                          <p className="line2"></p>
                        </div>
                      </div>
                    </li>
                  </Link>
                </>
              )
            }) : ""
        }
      </ul>
    </div>
  )


}





