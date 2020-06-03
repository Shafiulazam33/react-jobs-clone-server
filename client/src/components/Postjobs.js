
import React, { useState, useEffect, useRef } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { Dropdown, Icon } from 'semantic-ui-react'
import { Button } from 'semantic-ui-react'
import Geosuggest from 'react-geosuggest';
import {
    Link
} from "react-router-dom";
import Axios from 'axios'
import './Postjobs.css'
import { remoteOptions, tagOptions, experienceOptions, jobtypeOptions } from '../utils/dropdownOptions'

export default function Postjobs() {
    const geosuggestEl = useRef(null);
    const [error, setError] = useState({
        company_id: "", company_name: "", website: "", logo_url: "", short_description: "",
        job_title: "", location: "", remote: "", job_type: "", salary: "", experience: "",
        apply_link: "", tags: "", description: ""
    });
    const [isLoaded, setIsLoaded] = useState(false);
    const [isPosted, setIsPosted] = useState(false);
    const [job_id, setjob_id] = useState("");
    const [state, setState] =
        useState({
            existing_name: [], company_id: "", company_name: "", website: "", logo_url: "", short_description: "",
            job_title: "", location: {}, remote: "", job_type: "", salary: "", experience: "",
            apply_link: "", tags: "", description: "", discard: false
        });
    console.log(state)
    useEffect(() => {
        Axios.get('http://localhost:4000/api/job/companies')
            .then((res) => {
                console.log(res)
                let options = []
                if (res.data.companies.length > 0) {
                    console.log("dd")
                    res.data.companies.forEach((item, index) => {
                        options.push({ key: item._id, text: item.company_name, value: item._id })
                    })
                    setState({ ...state, existing_name: options });
                }
                else {
                    console.log("sddd")
                    setState({ ...state, discard: true });
                }
                console.log(options)
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
        const RouteOptions = () => {
            if (!state.discard) {
                return 'http://localhost:4000/api/job/post-job'
            }
            else {
                return 'http://localhost:4000/api/job/post-company-job'
            }
        }
        Axios.post(RouteOptions(), state)
            .then((res) => {
                console.log(res)
                //setIsPosted(true)
                setjob_id(res.data.jobpost._id)
                //history.push('/login')
            })
            .catch(error => {
                console.log(error.response.data)
                setError({ ...error.response.data });
            })
    }
    const onSuggestSelect = (suggest) => {
        let location = {};
        let address = suggest.gmaps.address_components
        console.log(address)
        location.location_name = suggest.description
        location.place_id = suggest.gmaps.place_id
        address.map((value, index) => {
            if (value.types[0] == "country") {
                location.country = value.long_name;
            }
            else if (value.types[0] == "administrative_area_level_1") {
                location.admin_area1 = value.long_name;
            }
            else if (value.types[0] == "administrative_area_level_2") {
                location.admin_area2 = value.long_name;
            }
        }
        )
        setState({ ...state, location })
        console.log(location)
    };
    const handleEditorChange1 = (short_description, editor) => {
        setState({ ...state, short_description })
    }
    const handleEditorChange2 = (description, editor) => {
        setState({ ...state, description })
    }
    const form_nameexist = (<><div className="company-wrapper">
        <div className="company-type"> <p className="title">Select an existing company</p>
            <Dropdown
                placeholder='Select Friend'
                name="company_id"
                fluid
                selection
                onChange={dropdownChangeHandler}
                options={state.existing_name}
            />
            {(error.company_id) ? <p className="error">Please Select A Company Name</p> : ""}
        </div>
        <h4>OR</h4>
        <div>
            <Button onClick={() => setState({ ...state, discard: true, company_id: "" })} primary>create a new company</Button>
        </div>
    </div></>);
    const formnotexist = (<>
        <div className="create-company-wrapper">
            <div className="company-name"><p className="title">Company name</p><div className="ui input"> <input name="company_name" onChange={myChangeHandler} value={state.company_name} placeholder="Company name" /></div>
                {(error.company_name) ? <p className="error">{error.company_name}</p> : ""}</div>
            <div className="website"><p className="title">website</p><div className="ui input">< input name="website" onChange={myChangeHandler} value={state.website} placeholder="Website" /> </div>
                {(error.website) ? <p className="error">{error.company_name}</p> : ""}</div>
            <div className="company-logo-url"><p className="title">Company logo url</p>
                <div className="ui input">< input name="logo_url" onChange={myChangeHandler} value={state.logo_url} placeholder="Logo url" /></div>
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

    if (isLoaded && !isPosted) {
        return (
            <>
                <div className="profile-wrapper">
                    <div className="post-job-form">
                        <form onSubmit={submitHandler}>
                            <div className="company">
                                <div className="quick-pick">
                                    <div>
                                        <span className="company-logo">c</span><span>Company</span>
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
                                    <div class="location"> <p class="title">Location</p> <div class="ui input">
                                        <Geosuggest
                                            ref={geosuggestEl}
                                            placeholder="Pick a location e.g. Tokyo"
                                            initialValue=""
                                            //fixtures={fixtures}
                                            onSuggestSelect={onSuggestSelect}
                                            location={new window.google.maps.LatLng(null, null)}
                                            radius="20" /></div>
                                        {(error.location) ? <p className="error">{error.location}</p> : ""}</div>
                                    <div class="remote-type"><p class="title">Remote-working</p>

                                        <Dropdown
                                            placeholder='Remote Job Or Not'
                                            name="remote"
                                            onChange={dropdownChangeHandler}
                                            fluid
                                            selection
                                            options={remoteOptions}
                                        />
                                        {(error.remote) ? <p className="error">{error.remote}</p> : ""}
                                    </div>
                                    <div className="job-type">
                                        <p className="title">Job Type</p>

                                        <Dropdown
                                            placeholder='job type'
                                            name="job_type"
                                            onChange={dropdownChangeHandler}
                                            fluid
                                            selection
                                            options={jobtypeOptions}
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
                                    />
                                    {(error.tags) ? <p className="error">{error.tags}</p> : ""}
                                </div>
                                <div class="description"><p class="title">Description</p>
                                    <Editor
                                        initialValue=""
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
                        </form>
                    </div>
                </div>
            </>
        )
    } else if (isLoaded && isPosted) {
        return (
            <div class="advertise-wrapper">
                <div className="icon-briefcase"><Icon color='black' name="briefcase" /></div>
                <h1>Thank you for your insertion</h1>
                <p>Your insertion has been published , want to promote it?</p>
                <p><Link className="ui large primary button" to="/">Go back to Home</Link><Link className="ui large primary button" to={`/Featured/${job_id}`}>Promote my insertion</Link></p>
            </div >
        )
    }
    else {
        return (
            <>
            </>
        )
    }
}
