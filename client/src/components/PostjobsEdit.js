import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import { Editor } from '@tinymce/tinymce-react';
import { Dropdown, Icon } from 'semantic-ui-react'
import { Button } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import Axios from 'axios'
import './Postjobs.css'
import { remoteOptions, tagOptions, experienceOptions, jobtypeOptions } from '../utils/dropdownOptions'

export default function Postjobs() {
    const { _id } = useParams();
    const [error, setError] = useState({
        company_id: "", company_name: "", website: "", logo_url: "", short_description: "",
        job_title: "", location: "", remote: "", job_type: "", salary: "", experience: "",
        apply_link: "", tags: "", description: ""
    });
    const [isLoaded, setIsLoaded] = useState(false);
    const [state, setState] =
        useState({
            existing_name: [], company_id: "", company_name: "", website: "", logo_url: "", short_description: "",
            job_title: "", location: "", remote: "", job_type: "", salary: "", experience: "",
            apply_link: "", tags: "", description: "", discard: false
        });
    console.log(state)
    useEffect(() => {
        Axios.post('http://localhost:4000/api/job/find-job-edit', { _id })
            .then((res) => {
                console.log(res)
                let options = []
                res.data.companies.forEach((item, index) => {
                    options.push({ key: item._id, text: item.company_name, value: item._id })
                })
                let { company_name } = res.data.companies.find((item) => {
                    return (item._id === res.data.jobposts.company_id)
                })
                console.log(options, res.data.jobposts, res.data.companies)
                setState({ ...state, existing_name: options, ...res.data.jobposts, company_name });
                setIsLoaded(true);
            })
            .catch(error => {
                console.log("error")
                console.log(error)
                setError(error);
            })
    }, []);
    const myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        setState({ ...state, [nam]: val });
        console.log(val)
    }

    const dropdownChangeHandler = (event, data) => {
        setState({ ...state, [data.name]: data.value });
    }

    const submitHandler = (event) => {
        event.preventDefault();
        Axios.put('http://localhost:4000/api/profile/update-job', { _id, ...state })
            .then((res) => {

                console.log(res)
                //history.push('/login')
            })
            .catch(error => {
                console.log(error.response.data)
                setError({ ...error.response.data });
            })
    }

    const handleEditorChange1 = (short_description, editor) => {
        setState({ ...state, short_description })
    }
    const handleEditorChange2 = (description, editor) => {
        setState({ ...state, description })
    }
    const form_nameexist = (<><div class="company-wrapper">
        <div class="company-type"> <p class="title">Select an existing company</p>
            <Dropdown
                placeholder='Select Friend'
                name="company_id"
                fluid
                selection
                onChange={dropdownChangeHandler}
                options={state.existing_name}
                text={state.company_name}
            />
            {(error.company_id) ? <p className="error">Please Select A Company Name</p> : ""}
        </div>
        <h4>OR</h4>
        <div>
            <Button onClick={() => setState({ ...state, discard: true, company_id: "" })} primary>create a new company</Button>
        </div>
    </div></>);
    const formnotexist = (<>
        <div class="create-company-wrapper">
            <div class="company-name"><p class="title">Company name</p><div class="ui input"> <input name="company_name" onChange={myChangeHandler} value={state.company_name} placeholder="Company name" /></div>
                {(error.company_name) ? <p className="error">{error.company_name}</p> : ""}</div>
            <div class="website"><p class="title">website</p><div class="ui input">< input name="website" onChange={myChangeHandler} value={state.website} placeholder="Website" /> </div>
                {(error.website) ? <p className="error">{error.company_name}</p> : ""}</div>
            <div class="company-logo-url"><p class="title">Company logo url</p>
                <div class="ui input">< input name="logo_url" onChange={myChangeHandler} value={state.logo_url} placeholder="Logo url" /></div>
                {(error.logo_url) ? <p className="error">{error.logo_url}</p> : ""}</div>
        </div>

        <div class="short-description">
            <p class="title">Short description</p>
            <Editor
                initialValue=""
                init={{
                    height: 200,
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
                name="short_description"
                onEditorChange={handleEditorChange1}
            />
            {(error.short_description) ? <p className="error">{error.short_description}</p> : ""}
        </div>
        {(state.existing_name) ? <Button onClick={() => setState({ ...state, discard: false, company_name: "" })}><Icon name="remove circle" />Discard and Select an Company name</Button> : ""}
    </>);

    if (isLoaded) {
        return (
            <>
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
                            <div class="quick-pick2">
                                <div> <span class="job-logo"><img src="/images/iconfinder_Sed-05_2232591.png" />a</span>
                                    <span>Job</span>
                                </div>
                            </div>
                            <div class="layer1">
                                <div class="job-title"><p class="title">Job Title</p><div class="ui input"><input type="text" name="job_title" placeholder="Front end developer" onChange={myChangeHandler} value={state.job_title} /></div>
                                    {(error.job_title) ? <p className="error">{error.job_title}</p> : ""}</div>
                                <div class="location"> <p class="title">Location</p> <div class="ui input"><input name="location" placeholder="Pick a location e.g. Tokyo" onChange={myChangeHandler} value={state.location} /></div>
                                    {(error.location) ? <p className="error">{error.location}</p> : ""}</div>
                                <div class="remote-type"><p class="title">Remote-working</p>

                                    <Dropdown
                                        placeholder='Remote Job Or Not'
                                        name="remote"
                                        onChange={dropdownChangeHandler}
                                        fluid
                                        selection
                                        options={remoteOptions}
                                        text={state.remote}
                                    />
                                    {(error.remote) ? <p className="error">{error.remote}</p> : ""}
                                </div>
                                <div class="job-type">
                                    <p class="title">Job Type</p>

                                    <Dropdown
                                        placeholder='job type'
                                        name="job_type"
                                        onChange={dropdownChangeHandler}
                                        fluid
                                        selection
                                        options={jobtypeOptions}
                                        text={state.job_type}
                                    />
                                    {(error.job_type) ? <p className="error">{error.job_type}</p> : ""}
                                </div>
                            </div>
                            <div class="layer2">
                                <div class="salary"> <p class="title">Salary</p><div class="ui input"><input name="salary" placeholder="25000$-35000$" onChange={myChangeHandler} value={state.salary} /></div>
                                    {(error.salary) ? <p className="error">{error.salary}</p> : ""}</div>
                                <div class="experience">
                                    <div class="experience-type">
                                        <p class="title">Level of experience</p>

                                        <Dropdown
                                            placeholder='Level of experience'
                                            name="experience"
                                            onChange={dropdownChangeHandler}
                                            fluid
                                            selection
                                            options={experienceOptions}
                                            text={state.experience}
                                        />
                                        {(error.experience) ? <p className="error">{error.experience}</p> : ""}
                                    </div>
                                </div>
                                <div class="apply">
                                    <p class="title">Apply url or email</p><div class="ui input"><input name="apply_link" onChange={myChangeHandler} value={state.apply_link} placeholder="Url or email to use in order to apply" /></div>
                                    {(error.apply_link) ? <p className="error">{error.apply_link}</p> : ""}</div>
                            </div>
                            <div class="tags"><p class="title">Tags</p>
                                <Dropdown
                                    placeholder='Select tags'
                                    fluid
                                    multiple
                                    search
                                    selection
                                    name="tags"
                                    onChange={dropdownChangeHandler}
                                    options={tagOptions}
                                    value={state.tags}
                                />
                                {(error.tags) ? <p className="error">{error.tags}</p> : ""}
                            </div>
                            <div class="description"><p class="title">Description</p>
                                <Editor
                                    initialValue={state.description}
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
                                    onEditorChange={handleEditorChange2}
                                />
                                {(error.description) ? <p className="error">{error.description}</p> : ""}
                            </div>
                            <Button type="submit" primary>Submit</Button>
                        </div>
                    </div>
                </form >
            </>
        )
    } else {
        return (
            <>
            </>
        )
    }
}
