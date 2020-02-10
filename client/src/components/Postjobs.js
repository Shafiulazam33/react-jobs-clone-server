
import React, { useState, useEffect } from 'react'
const option = ["google", "apple"]
export default function Postjobs() {
    const [state, setState] =
        useState({
            existingcompany: "g", company: "", website: "", logo: "", shortdescription: "",
            job: "", location: "", remote: "", jobtype: "", salary: "", experience: "",
            applylink: "", tags: "", description: "", discard: false
        });
    const SelectOptions = () => {
        const selectoptions = <select value={state.value} onChange={handleChange}>
            {option.map((word, index) =>
                <option value={word}>{word}</option>
            )} </select>;

        return selectoptions;
    }
    const myChangeHandler=()=>{

    }
    const handleChange=()=>{

    }
    const formcompanyexist =(<>Select an existing company { SelectOptions } or <button>Create new company</button></>);
    const formnotexist = (<>Company name <input name="company" onChange={myChangeHandler} value={state.searchword} />
    website < input name = "website" onChange = { myChangeHandler } value = { state.searchword } /> Company logo url
        < input name = "logo" onChange = { myChangeHandler } value = { state.searchword } /> short description
            < input name = "shortdescription" onChange = { myChangeHandler } value = { state.searchword } /> 
    <button>Discard and Select an existing company</button></>);
    return (
        <div>

            Job

            {(state.existingcompany && state.discard === false) ? formcompanyexist : formnotexist}
            Job Title<input name="job" onChange={myChangeHandler} value={state.searchword} />
            Location <input name="location" onChange={myChangeHandler} value={state.searchword} />
            Remote working<input name="remote" onChange={myChangeHandler} value={state.searchword} />
            Job Type
               <select value={state.value} onChange={handleChange}>
                <option value={"contract"}>contract</option>
                <option value={"freelance"}>freelance</option>
                <option value={"part - time"}>part-time</option>
            </select>
            Salary<input name="salary" onChange={myChangeHandler} value={state.searchword} />
            Level of experience<input name="experience" onChange={myChangeHandler} value={state.searchword} />
            Apply url or email<input name="applylink" onChange={myChangeHandler} value={state.searchword} />
            Tags<input name="tags" onChange={myChangeHandler} value={state.searchword} />
            Description<input name="description" onChange={myChangeHandler} value={state.searchword} />
        </div>
    )
}
