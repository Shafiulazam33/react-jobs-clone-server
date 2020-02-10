import React, { useState, useEffect } from 'react'
const production=[{description:"Dhaka,Bangladesh"},{description:"onunhandledrejection,USA"}]
const quicklocations = ["San Francisco", "New York", "US", "London", "Berlin", "Singapore"]
export default function Homefrom() {
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
    const SearchQuicklocation=(index)=>{

        setState({ ...state, quicklocation:quicklocations[index]});

    }
    const SearchHandler=(e)=>{
        if (e.key === 'Enter') {
            console.log('do validate');
          }
    }
    return (
        <div>
            <p>Search for a  job or post your Job offer (for free!) in minutes.</p>
            <input name="searchword" onChange={myChangeHandler} value={state.searchword} onKeyPress={SearchHandler} />
    {production.map((value,index)=><p key={index}>{value.description}</p>)}
            <p><span onClick={ChangeRemoteOption}>change </span><span>I'm looking for remote jobs</span></p>
            <ul>{quicklocations.map((word,index) =>
                <li key={index} onClick={()=>SearchQuicklocation(index)}>{word}</li>
            )}</ul>

        </div>
    )
}
