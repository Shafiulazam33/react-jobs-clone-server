
import React, { useState, useEffect } from 'react'
import Axios from 'axios'
const option = ["google", "apple"]
export default function Postjobs() {
    const [state, setState] =
        useState({
            existing_name: "", company_name: "", website: "", logo_url: "", short_description: "",
            job_title: "", location: "", remote: "", job_type: "", salary: "", experience: "",
            apply_link: "", tags: "", description: "", discard: false
        });
    const SelectOptions = () => {
        const selectoptions = <select value={state.value} onChange={handleChange}>
            {option.map((word, index) =>
                <option value={word}>{word}</option>
            )} </select>;

        return selectoptions;
    }
    const myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;

        setState({ ...state, [nam]: val });
    }
    const handleChange = (event) => {
        console.log(event.target.name)
        let name = event.target.name
        if (name === "remote") {
            setState({ ...state, remote: event.target.value });
        }
        else {
            setState({ ...state, job_type: event.target.value });
        }
    }
    const submitHandler = (event) => {
        event.preventDefault();

        console.log(state)
        Axios.post('http://localhost:4000/api/job/post-company-job', state)
            .then((res) => {

                console.log(res)
                //history.push('/login')
            })
            .catch(error => {
                console.log(error.response.data)
                // setError(error.response.data);
            })
    }
    const form_nameexist = (<>Select an existing _name { SelectOptions} or <button>Create new _name</button></>);
    const formnotexist = (<>company name <input name="company_name" onChange={myChangeHandler} value={state.company_name} />
    website < input name="website" onChange={myChangeHandler} value={state.website} /> _name logo url
        < input name="logo_url" onChange={myChangeHandler} value={state.logo_url} /> short description
        < input name="short_description" onChange={myChangeHandler} value={state.short_description} />
        <button>Discard and Select an existing _name</button></>);
    return (
        <div>

            Job
            <form onSubmit={submitHandler}>
                {(state.existing_name && state.discard === false) ? form_nameexist : formnotexist}
            Job Title<input name="job_title" onChange={myChangeHandler} value={state.job_title} />
            Location <input name="location" onChange={myChangeHandler} value={state.location} />
            Remote working
            <select name="remote" value={state.remote} onChange={handleChange}>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </select>
            Job Type
            <select name="job_type" value={state.job_type} onChange={handleChange}>
                    <option value="contract">contract</option>
                    <option value="freelance">freelance</option>
                    <option value="part-time">part-time</option>
                </select>
            Salary<input name="salary" onChange={myChangeHandler} value={state.salary} />
            Level of experience<input name="experience" onChange={myChangeHandler} value={state.experience} />
            Apply url or email<input name="apply_link" onChange={myChangeHandler} value={state.apply_link} />
            Tags<input name="tags" onChange={myChangeHandler} value={state.tags} />
            Description<input name="description" onChange={myChangeHandler} value={state.description} />
                <input type="submit" value="submit" />
            </form>
        </div>
    )
}
