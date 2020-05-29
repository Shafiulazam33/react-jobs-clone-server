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
import { Checkbox } from 'semantic-ui-react'
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
      Axios.get(`http://free.ipwhois.io/json/`)
        .then(res => {
          console.log(res)
          //let inp = document.getElementsByClassName("geosuggest__input");
          //ReactDOM.findDOMNode(inp[0]).initialValue = "US"
          //ReactDOM.findDOMNode(inp[0]).focus()
          //console.log(inp)
          //ReactDOM.findDOMNode(inp[0]).classList.add("geosuggest__suggests--hidden");

          //geosuggestEl.current.blur()
          let quicklocation = res.data.region + "," + res.data.country
          setState({ ...state, quicklocation })
          setTimeout(
            function () {
              geosuggestEl.current.focus()
              let it = document.getElementsByClassName("geosuggest__suggests");
              ReactDOM.findDOMNode(it[0]).classList.add("geosuggest__suggests5");
            }
              .bind(this),
            3000
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

        })
        .catch(error => {
          console.log(error)
          setError({ error: true })
        })
    }
  }, []);
  const checkk = () => {
    console.log("aaqqqqq")
    let inp = document.getElementsByClassName("geosuggest__input");
    ReactDOM.findDOMNode(inp[0]).focus()
    let item = document.getElementsByClassName("geosuggest__item");
    ReactDOM.findDOMNode(item[0]).click()
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
    let location = {};
    let address = suggest.gmaps.address_components
    console.log(address)
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
    console.log(location)
    Axios.post(`http://localhost:4000/api/job/jobs`, { "location.place_id": location.place_id })
      .then(res => {
        if (res.data.jobs.length < 1) {
          Axios.post(`http://localhost:4000/api/job/jobs`, { "location.admin_area1": location.admin_area1 })
            .then(res => {
              if (res.data.jobs.length < 1) {
                Axios.post(`http://localhost:4000/api/job/jobs`, { "location.admin_area2": location.admin_area2 })
                  .then(res => {
                    if (res.data.jobs.length < 1) {
                      Axios.post(`http://localhost:4000/api/job/jobs`, { "location.country": location.country })
                        .then(res => {
                          if (res.data.jobs.length < 1) {

                          }
                          else {
                            console.log(res)

                          }
                        })
                        .catch(error => {
                          console.log(error)
                        })
                    }
                    else {
                      console.log(res)

                    }
                  })
                  .catch(error => {
                    console.log(error)
                  })
              }
              else {
                console.log(res)

              }
            })
            .catch(error => {
              console.log(error)
            })
        }
        else {
          console.log(res)

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


  return (
    <div className="search-wrapper">
      <div className="searchbox-background">
        <div className="searchbox">
          <h3>Search for a<span onClick={checkk}>asssssss</span>
                    Job or post your Job offer (for <span className="free">free</span>!) in minutes.</h3>
          <Geosuggest
            ref={geosuggestEl}
            placeholder="Start typing!"
            initialValue={state.quicklocation}
            //autoComplete="on"
            //autoActivateFirstSuggest={true}
            //types={["(regions)"]}
            //onActivateSuggest={function (suggest) { console.log("qw", suggest.gmaps);/*history.push(`/${suggest.description}`)*/ }}
            //getSuggestLabel={function (suggest) { console.log(suggest) }}
            queryDelay="2500"
            //autoActivateFirstSuggest="true"
            fixtures={fixtures}
            onSuggestSelect={onSuggestSelect}
            onChange={onChange}
            location={new window.google.maps.LatLng(null, null)}
            radius="20" />
          <div className="remote-check"><p class="z-index0"><Checkbox onChange={toggleCheckBox} toggle /></p>
            <p>I'm looking for remote jobs</p>
          </div>
          <div className="quick-pick" id="z-index0">
            <div>QUICK PICK</div>
          </div>
          <ul className="form-ul">
            {
              quicklocations.map((item, index) => {
                return (<><li key={index}><Link to={`location/${item}`}>{item}</Link></li></>)
              }
              )
            }
          </ul>
        </div>
      </div>
      {(!name) && (stateError.error)
      }
    </div >
  )


}



