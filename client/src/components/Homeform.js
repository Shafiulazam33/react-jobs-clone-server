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

import React, { Component } from 'react'
import Geosuggest from 'react-geosuggest';
import ReactDom from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";
import './Homeform.css'
import Axios from 'axios';
import { Checkbox } from 'semantic-ui-react'
const quicklocations = ["San Francisco", "New York", "US", "London", "Berlin", "Singapore"]
let fixtures = [
  { label: 'Old Elbe Tunnel, Hamburg', location: { lat: 53.5459, lng: 9.966576 } },
  { label: 'Reeperbahn, Hamburg', location: { lat: 53.5495629, lng: 9.9625838 } },
  { label: 'Alster, Hamburg', location: { lat: 53.5610398, lng: 10.0259135 } }
];
let cnt = 0;
let key = ["AIzaSyBdTBGCoRjmBdppXtRJBrGIOsV5hDU8dek", "AIzaSyB5VHMmOzQQt2KvkxEsKRLIrWR7Bbsu3gc", "AIzaSyBemk6xyrfUUfCgQEBkEG2GRZQIaFhsoAc", "AIzaSyDxZHL84bvCuMg_Vt_Lf-Jq179YqOiPvyM", "AIzaSyDfYgefW84EqGGQtJJOhvJnazMgufzLmRg"]
export default class Homeform extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchword: "", remote: false, quicklocation: "", skip: false, count: 0
    };
  }

  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;

    this.setState({ [nam]: val });
  }

  ChangeRemoteOption = () => {
    if (this.state.remote) {
      this.setState({ remote: false });
    } else {
      this.setState({ remote: true });
    }

  }
  SearchQuicklocation = (index) => {

    this.setState({ quicklocation: quicklocations[index] });

  }
  SearchHandler = (event) => {
    /* if (event.key === 'Enter') {
       console.log(history);
 
       //history.push(`location/${state.searchword}`)
       history.push(`/chk`)
 
     }*/
  }
  submitHandler = (event) => {
    event.preventDefault()
    Axios.get(`http://localhost:4000/api/job/jobs/${this.state.searchword}`)
      .then(res => {
        console.log(res)

      })
      .catch(error => {
        console.log(error.response.data)
      })
  }
  onSuggestSelect = (suggest, value) => {
    console.log("aqqq", suggest, value);
  }
  onChange = (value) => {
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
  componentDidMount() {
    console.log("sd")
    let head = document.getElementsByTagName('head')[0];
    let js = document.createElement("script");
    js.type = "text/javascript";
    js.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDA5DcCkvhKKbCS9vPu2W7jPx-aHbzzvHc&libraries=places";
    head.appendChild(js);
    setTimeout(
      function () {
        this.setState({ skip: true });
      }
        .bind(this),
      500
    );

  }
  render() {
    console.log("as")

    if (this.state.skip) {
      return (
        <div className="search-wrapper">
          <div className="searchbox-background">
            <div className="searchbox">
              <h3>Search for a
                    Job or post your Job offer (for <span className="free">free</span>!) in minutes.</h3>
              <Geosuggest
                ref={el => this._geoSuggest = el}
                placeholder="Start typing!"
                //initialValue="DFW International Airport (DFW), Aviation Drive, DFW Airport, TX, USA"
                queryDelay="2500"
                autoActivateFirstSuggest="true"
                //fixtures={fixtures}
                onSuggestSelect={this.onSuggestSelect}
                onChange={this.onChange}
                location={new window.google.maps.LatLng(null, null)}
                radius="20" />
              <div className="remote-check"><p class="z-index0"><Checkbox toggle /></p>
                <p>I'm looking for remote jobs</p>
              </div>
              <div className="quick-pick" id="z-index0">
                <div>QUICK PICK</div>
              </div>
              <ul className="form-ul">
                {
                  quicklocations.map((item, index) => {
                    return (<><li key={index}>{item}</li></>)
                  }
                  )
                }
              </ul>
            </div>
          </div>
        </div>
      )
    } else { return (<></>) }
  }
}



