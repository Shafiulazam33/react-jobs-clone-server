import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
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
export default Homefrom;