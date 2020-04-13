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
  return (
    <div>
      <p>Search for a  job or post your Job offer (for free!) in minutes.</p>
      <input name="searchword" onChange={myChangeHandler} value={state.searchword} onKeyPress={SearchHandler} />
      {production.map((value, index) => <p key={index}>{value.description}</p>)}
      <p><span onClick={ChangeRemoteOption}>change </span><span>I'm looking for remote jobs</span></p>
      <ul>{quicklocations.map((word, index) =>
        <li key={index} onClick={() => SearchQuicklocation(index)}>{word}</li>
      )}</ul>

      <Switch>
        <Route exact path={path}>
          <h3>Please select a topic.</h3>
        </Route>
        <Route path={`location/:search`}>
          <h1>ok janu</h1>
        </Route>
      </Switch>
    </div>
  )
}
export default Homefrom;