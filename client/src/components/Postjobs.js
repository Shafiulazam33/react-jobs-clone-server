
import React, { useState, useEffect } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { Dropdown } from 'semantic-ui-react'
import { Button } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import Axios from 'axios'
import './Postjobs.css'

const option = ["google", "apple"]
const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
]
const friendOptions = [
    {
        key: 'Jenny Hess',
        text: 'Jenny Hess',
        value: 'Jenny Hess'
    },
    {
        key: 'Elliot Fu',
        text: 'Elliot Fu',
        value: 'Elliot Fu'
    }
]
export default function Postjobs() {
    const [state, setState] =
        useState({
            existing_name: "as", company_name: "", website: "", logo_url: "", short_description: "",
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
        console.log(val)
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
    const handleEditorChange = (content, editor) => {
        console.log('Content was updated:', content);
    }
    const form_nameexist = (<><div class="company-wrapper">
        <div class="company-type"> <p class="title">Select an existing company</p>
            <Dropdown
                placeholder='Select Friend'
                fluid
                selection
                options={friendOptions}
            />
        </div>
        <h4>OR</h4>
        <button class="ui primary button company-button">create a new company</button>
    </div></>);
    const formnotexist = (<>company name <input name="company_name" onChange={myChangeHandler} value={state.company_name} />
    website < input name="website" onChange={myChangeHandler} value={state.website} /> _name logo url
        < input name="logo_url" onChange={myChangeHandler} value={state.logo_url} /> short description
        < input name="short_description" onChange={myChangeHandler} value={state.short_description} />
        <button>Discard and Select an existing _name</button></>);
    return (

        <>

            <button class="ui button">Click Here</button>
            <Dropdown
                placeholder='Select Friend'
                fluid
                selection
                options={friendOptions}
            />
            Job
            <form onSubmit={submitHandler}>

                <div class="post-job-form">
                    <div class="company">
                        <div class="quick-pick">
                            <div>
                                <span class="company-logo">c</span><span>Company</span>
                            </div>
                        </div>
                        {(state.existing_name && state.discard === false) ? form_nameexist : formnotexist}
                    </div>
                    <div class="job">
                        <div class="quick-pick">
                            <div> <span class="job-logo"><img src="/images/iconfinder_Sed-05_2232591.png" /></span>
                                <span>Job</span>
                            </div>
                        </div>
                        <div class="layer1">
                            <div class="job-title"><p class="title">Job Title</p><div class="ui input"><input type="text" name="job_title" placeholder="Front end developer" onChange={myChangeHandler} value={state.job_title} /></div></div>
                            <div class="location"> <p class="title">Location</p> <div class="ui input"><input name="location" placeholder="Pick a location e.g. Tokyo" onChange={myChangeHandler} value={state.location} /></div></div>
                            <div class="remote-type"><p class="title">Remote-working</p>
                                <div class="remote-type-select" name="remote" value={state.remote} onChange={handleChange}>
                                    <p class="select">Remote Job Or Not</p>
                                    <div class="remote-type-list">
                                        <p>Yes</p>
                                        <p>No</p>
                                    </div>
                                </div>
                                <Dropdown
                                    placeholder='Remote Job Or Not'
                                    name="remote"
                                    onChange={handleChange}
                                    fluid
                                    selection
                                    options={friendOptions}
                                />
                            </div>
                            <div class="job-type">
                                <p class="title">Job Type</p>
                                <div class="job-type-select" name="job_type" value={state.job_type} onChange={handleChange}>
                                    <p class="select">job type</p>
                                    <div class="job-type-list">
                                        <p>Part-time</p>
                                        <p>Full-time</p>
                                    </div>
                                </div>
                                <Dropdown
                                    placeholder='job type'
                                    name="job_type"
                                    onChange={handleChange}
                                    fluid
                                    selection
                                    options={friendOptions}
                                />
                            </div>
                        </div>
                        <div class="layer2">
                            <div class="salary"> Salary<div class="ui input"><input name="salary" placeholder="25000$-35000$" onChange={myChangeHandler} value={state.salary} /></div></div>
                            <div class="experience">
                                <div class="experience-type">
                                    <p class="title">Level of experience</p>
                                    <div class="experience-type-select" name="experience" onChange={myChangeHandler} value={state.experience}>
                                        <p class="select">Level of experience</p>
                                        <div class="experience-type-list">
                                            <p>Part-time</p>
                                            <p>Full-time</p>
                                        </div>
                                    </div>
                                    <Dropdown
                                        placeholder='Level of experience'
                                        name="experience"
                                        onChange={handleChange}
                                        fluid
                                        selection
                                        options={friendOptions}
                                    />
                                </div>
                            </div>
                            <div class="apply">
                                <p class="title">Apply url or email</p><div class="ui input"><input name="apply_link" onChange={myChangeHandler} value={state.apply_link} placeholder="Url or email to use in order to apply" /></div></div>
                        </div>
                        <div class="tags"><p class="title">Tags</p><div class="ui input"><input name="tags" onChange={myChangeHandler} value={state.tags} /></div></div>
                        <div class="description"><p class="title">Description</p>
                            <Editor
                                initialValue="<p>This is the initial content of the editor</p>"
                                init={{
                                    height: 500,
                                    menubar: false,
                                    plugins: [
                                        'advlist autolink lists link image charmap print preview anchor',
                                        'searchreplace visualblocks code fullscreen',
                                        'insertdatetime media table paste code help wordcount'
                                    ],
                                    toolbar:
                                        'undo redo underline Blockquote | formatselect fontselect fontsizeselect| bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist | removeformat | cut copy paste'
                                }}
                                onEditorChange={handleEditorChange}
                            />
                        </div>
                    </div>
                </div>
            </form >
        </>
    )
}
