/*import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import Geosuggest from 'react-geosuggest';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";
import Axios from 'axios';

const production = [{ description: "Dhaka,Bangladesh" }, { description: "onunhandledrejection,USA" }]
const quicklocations = ["San Francisco", "New York", "US", "London", "Berlin", "Singapore"]
let fixtures = [
  { label: 'Old Elbe Tunnel, Hamburg', location: { lat: 53.5459, lng: 9.966576 } },
  { label: 'Reeperbahn, Hamburg', location: { lat: 53.5495629, lng: 9.9625838 } },
  { label: 'Alster, Hamburg', location: { lat: 53.5610398, lng: 10.0259135 } }
];

function Homefrom() {
  let history = useHistory();
  let { path, url } = useRouteMatch();
  const [state, setState] = useState({ searchword: "", remote: false, quicklocation: "" });
  const myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;

    setState({ ...state, [nam]: val });
  }

  const ChangeRemoteOption = () => {
    if (state.remote) {
      setState({ ...state, remote: false });
    } else {
      setState({ ...state, remote: true });
    }

  }
  const SearchQuicklocation = (index) => {

    setState({ ...state, quicklocation: quicklocations[index] });

  }
  const SearchHandler = (event) => {
    if (event.key === 'Enter') {
      console.log(history);

      //history.push(`location/${state.searchword}`)
      history.push(`/chk`)

    }
  }
  const submitHandler = (event) => {
    event.preventDefault()
    Axios.get(`http://localhost:4000/api/job/jobs/${state.searchword}`)
      .then(res => {
        console.log(res)

      })
      .catch(error => {
        console.log(error.response.data)
      })
  }
  const onSuggestSelect = (suggest) => {
    console.log(suggest);
  }
  return (
    <div class="search-wrapper">
      <div class="searchbox-background">
        <div class="searchbox">
          <h3>Search for a
                    Job or post your Job offer (for <span class="free">free</span>!) in minutes.</h3>
          <input class="input-location" type="" name="" placeholder="Pick a location e.g. San Francisco" />
          <div class="remote-check"><input type="checkbox" name="" />
            <p>I'm looking for remote jobs</p>
          </div>
          <div class="quick-pick">
            <p>QUICK PICK</p>
          </div>
          <ul class="ul">
            <li>San Francisco</li>
            <li>San Francisco</li>
            <li>San Francisco</li>
            <li>San Francisco</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
export default Homefrom;*/
import React, { useState, useEffect, useRef } from 'react'
import Geosuggest from 'react-geosuggest';
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
  useHistory
} from "react-router-dom";
import './Homeform.css'
import Axios from 'axios';
import { Icon, Label, Button, Checkbox, Message } from 'semantic-ui-react'

const quicklocations = ["San Francisco", "New York", "US", "London", "Berlin", "Singapore"]
let Type = ["establishment", "(regions)", "(cities)"]
const fixtures = [
  { label: 'New York', location: { lat: 40.7033127, lng: -73.979681 } },
  { label: 'Rio', location: { lat: -22.066452, lng: -42.9232368 } },
  { label: 'Tokyo', location: { lat: 35.673343, lng: 139.710388 } }
];
let cnt = 0;
let key = ["AIzaSyBdTBGCoRjmBdppXtRJBrGIOsV5hDU8dek", "AIzaSyB5VHMmOzQQt2KvkxEsKRLIrWR7Bbsu3gc", "AIzaSyBemk6xyrfUUfCgQEBkEG2GRZQIaFhsoAc", "AIzaSyDxZHL84bvCuMg_Vt_Lf-Jq179YqOiPvyM", "AIzaSyDfYgefW84EqGGQtJJOhvJnazMgufzLmRg"]
export default function Homeform() {
  const geosuggestEl = useRef(null);
  let { name } = useParams();
  let history = useHistory();
  const [stateMessage, setMessage] = useState(null)
  const [statedata, setData] = useState([])
  const [stateError, setError] =
    useState({
      error: false
    })
  const [state, setState] =
    useState({
      searchword: "", remote: false, quicklocation: "", skip: true, count: 0
    })
  console.log(state.quicklocation)
  useEffect(() => {
    if (!name) {
      Axios.get(`http://free.ipwhois.io/jso/`)
        .then(res => {
          console.log(res)
          //let inp = document.getElementsByClassName("geosuggest__input");
          //ReactDOM.findDOMNode(inp[0]).initialValue = "US"
          //ReactDOM.findDOMNode(inp[0]).focus()
          //console.log(inp)
          //ReactDOM.findDOMNode(inp[0]).classList.add("geosuggest__suggests--hidden");

          //geosuggestEl.current.blur()
          let quicklocation
          if (res.data.country) {
            quicklocation = res.data.region + "," + res.data.country
            setState({ ...state, quicklocation })
            setTimeout(
              function () {
                geosuggestEl.current.focus()
                let it = document.getElementsByClassName("geosuggest__suggests");
                //ReactDOM.findDOMNode(it[0]).classList.add("geosuggest__suggests5");
              }
                .bind(this),
              5000
            );
            setTimeout(
              function () {

                let item = document.getElementsByClassName("geosuggest__item");
                console.log(item[0])
                ReactDOM.findDOMNode(item[0]).click()
              }
                .bind(this),
              10000
            );
          }
          else {
            Axios.post(`http://localhost:4000/api/job/jobs`, { "featured.isfeatured": 1 })
              .then(res => {
                console.log(res)
                setData(res.data.jobs)
              })
              .catch(error => {
                console.log(error)
              })
          }
        })
        .catch(error => {
          console.log(error)
          Axios.post(`http://localhost:4000/api/job/jobs`, { "featured.isfeatured": 1 })
            .then(res => {
              console.log(res)
              setData(res.data.jobs)
            })
            .catch(error => {
              console.log(error)
            })
          setError({ error: true })
        })
    }
  }, []);


  const checkk = () => {
    console.log("aaqqqqq")
    let inp = document.getElementsByClassName("geosuggest__input");
    ReactDOM.findDOMNode(inp[0]).value = ""

  }
  const myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;

    setState({ ...state, [nam]: val });
  }

  const ChangeRemoteOption = () => {
    if (state.remote) {
      setState({ ...state, remote: false });
    } else {
      setState({ ...state, remote: true });
    }

  }
  const SearchQuicklocation = (index) => {

    setState({ ...state, quicklocation: quicklocations[index] });

  }
  const SearchHandler = (event) => {
    /* if (event.key === 'Enter') {
       console.log(history);
 
       //history.push(`location/${state.searchword}`)
       history.push(`/chk`)
 
     }*/
  }
  const submitHandler = (event) => {
    event.preventDefault()
    Axios.get(`http://localhost:4000/api/job/jobs/${this.state.searchword}`)
      .then(res => {
        console.log(res)

      })
      .catch(error => {
        console.log(error.response.data)
      })
  }
  const onSuggestSelect = (suggest) => {
    console.log("aqqq", suggest);
    if (!suggest) { return; }
    setData([])
    let location = {};
    let address = suggest.gmaps.address_components
    console.log(address)
    location.location_name = suggest.description
    location.place_id = suggest.gmaps.place_id
    address.map((value, index) => {
      if (value.types[0] === "country") {
        console.log("i", value.long_name)
        location.country = value.long_name;
      }
      else if (value.types[0] === "administrative_area_level_1") {
        console.log("i", value.long_name)
        location.admin_area1 = value.long_name;
      }
      else if (value.types[0] === "administrative_area_level_2") {
        console.log("i", value.long_name)
        location.admin_area2 = value.long_name;
      }
    }
    )
    setMessage(<Message icon>
      <Icon name='circle notched' loading />
      <Message.Content>
        <Message.Header>Just one second</Message.Header>
      We are fetching that {location.location_name} for you.
    </Message.Content>
    </Message>)
    console.log(location)
    Axios.post(`http://localhost:4000/api/job/jobs`, { "location.place_id": location.place_id })
      .then(res => {
        if (res.data.jobs.length < 1) {
          Axios.post(`http://localhost:4000/api/job/jobs`, { "location.admin_area1": location.admin_area1 || location.country })
            .then(res => {
              if (res.data.jobs.length < 1) {
                Axios.post(`http://localhost:4000/api/job/jobs`, { "location.admin_area2": location.admin_area2 || location.country })
                  .then(res => {
                    if (res.data.jobs.length < 1) {
                      Axios.post(`http://localhost:4000/api/job/jobs`, { "location.country": location.country })
                        .then(res => {
                          if (res.data.jobs.length < 1) {
                            setMessage(<Message warning>
                              <Message.Header>Oh Sorry!</Message.Header>
                              <p>No result was found for location {location.location_name}</p>
                            </Message>)
                          }
                          else {
                            console.log(res)
                            setMessage(<Message warning>
                              <Message.Header>Oh Sorry!</Message.Header>
                              <p>No result was found for location {location.location_name},so we tried for {location.country}</p>
                            </Message>)
                            setData(res.data.jobs)
                          }
                        })
                        .catch(error => {
                          console.log(error)
                        })
                    }
                    else {
                      console.log(res)
                      setMessage(<Message warning>
                        <Message.Header>Oh Sorry!</Message.Header>
                        <p>No result was found for location {location.location_name},so we tried for {location.admin_area2}</p>
                      </Message>)
                      setData(res.data.jobs)
                    }
                  })
                  .catch(error => {
                    console.log(error)
                  })
              }
              else {
                console.log(res)
                setMessage(<Message warning>
                  <Message.Header>Oh Sorry!</Message.Header>
                  <p>No result was found for location {location.location_name},so we tried for {location.admin_area1}</p>
                </Message>)
                setData(res.data.jobs)
              }
            })
            .catch(error => {
              console.log(error)
            })
        }
        else {
          console.log(res)
          setMessage(null)
          setData(res.data.jobs)
        }
      })
      .catch(error => {
        console.log(error)
      })
  }
  const toggleCheckBox = (ind, val) => {
    console.log(val.checked)
  }
  const onChange = (value) => {
    console.log(value)
    //geosuggestEl.current.update(value)
    /*this.setState({ count: this.state.count + 1 })
    console.log(this.state.count)
  
    console.log("janu")
    setTimeout(
      function () {
        var scripts = document.getElementsByTagName('script');
        var i = scripts.length;
        while (i--) {
          scripts[i].parentNode.removeChild(scripts[i]);
        }
      }
        .bind(this),
      2000
    );
    if (cnt == 3) {
      cnt = 0;
    }
    else {
      cnt = cnt + 1
    }
    let head = document.getElementsByTagName('head')[0];
    //head.removeChild(head.childNodes[2]);
    let js = document.createElement("script");
    js.type = "text/javascript";
    js.src = "https://maps.googleapis.com/maps/api/js?key=" + key[cnt] + "&libraries=places";
  
    setTimeout(
      function () {
        head.appendChild(js);
      }
        .bind(this),
      500
    );
  */
  }
  console.log("as")
  const funcCheckbox = (ind, val) => {
    console.log(val, ind)
    let inp = document.getElementsByClassName("geosuggest__input");

    if (val.checked === true) {
      //ReactDOM.findDOMNode(inp[0]).value = ""
      geosuggestEl.current.update("")
      setMessage(null)
      Axios.post(`http://localhost:4000/api/job/jobs`, { remote: "Yes" })
        .then(res => {
          console.log(res)
          setData(res.data.jobs)
        })
        .catch(error => {
          console.log(error)
        })
    } else {
      //ReactDOM.findDOMNode(inp[0]).value = ""
      geosuggestEl.current.update("")
      setData([])
      setMessage(<Message info>
        <Message.Header>Was this what you wanted?</Message.Header>
        <p>Did you know it's been a while?</p>
      </Message>)
    }
  }
  const QuickLocationSearch = (loc) => {
    geosuggestEl.current.update(loc)
    setTimeout(
      function () {
        geosuggestEl.current.focus()
      }
        .bind(this),
      2000
    );

    setTimeout(
      function () {

        let item = document.getElementsByClassName("geosuggest__item");
        console.log(item[0])
        ReactDOM.findDOMNode(item[0]).click()
      }
        .bind(this),
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
    <>
      <div className="search-wrapper">
        <div className="searchbox-background">
          <div className="searchbox">
            <h3>Search for a<span onClick={checkk}>asssssss</span>
                    Job or post your Job offer (for <span className="free">free</span>!) in minutes.</h3>
            <Geosuggest
              ref={geosuggestEl}
              placeholder="Start typing!"
              initialValue={(state.quicklocation) ? state.quicklocation : ""}
              //autoComplete="on"
              //autoActivateFirstSuggest={true}
              //types={["(regions)"]}
              //onActivateSuggest={function (suggest) { console.log("qw", suggest.gmaps);/*history.push(`/${suggest.description}`)*/ }}
              //getSuggestLabel={function (suggest) { console.log(suggest) }}
              queryDelay="2500"
              //autoActivateFirstSuggest="true"
              //fixtures={fixtures}
              onSuggestSelect={onSuggestSelect}
              onChange={onChange}
              location={new window.google.maps.LatLng(null, null)}
              radius="20" />
            <div className="remote-check"><p class="z-index0"><Checkbox onChange={toggleCheckBox} toggle onChange={funcCheckbox} /></p>
              <p>I'm looking for remote jobs</p>
            </div>
            <div className="quick-pick" id="z-index0">
              <div>QUICK PICK</div>
            </div>
            <ul className="form-ul">
              {
                quicklocations.map((item, index) => {
                  return (<><li key={index}><Link onClick={() => QuickLocationSearch(item)}>{item}</Link></li></>)
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
    </>
  )


}




