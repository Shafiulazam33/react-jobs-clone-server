
import React, { useState, useEffect } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { Dropdown, Icon } from 'semantic-ui-react'
import { Button } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import Axios from 'axios'
import './Postjobs.css'
import { remoteOptions, tagOptions, experienceOptions, jobtypeOptions } from '../utils/dropdownOptions'

const option = ["google", "apple"]
const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
]

export default function Postjobs() {

    const [state, setState] =
        useState({
            existing_name: [], company_name: "", website: "", logo_url: "", short_description: "",
            job_title: "", location: "", remote: "", job_type: "", salary: "", experience: "",
            apply_link: "", tags: "", description: "", discard: false
        });
    useEffect(() => {
        Axios.get('http://localhost:4000/api/job/companies')
            .then((res) => {
                console.log(res)
                let options = []
                res.data.companies.forEach((item, index) => {
                    options.push({ key: item._id, text: item.company_name, value: item.company_name })
                })
                console.log(options)
                setState({ ...state, existing_name: options });
            })
            .catch(error => {
                //console.log(error.response.data)
                //setError(error.response.data);
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
                options={state.existing_name}
            />
        </div>
        <h4>OR</h4>
        <div>
            <Button onClick={() => setState({ ...state, discard: true })} primary>create a new company</Button>
        </div>
    </div></>);
    const formnotexist = (<>
        <div class="create-company-wrapper">
            <div class="company-name"><p class="title">Company name</p><div class="ui input"> <input name="company_name" onChange={myChangeHandler} value={state.company_name} placeholder="Company name" /></div></div>
            <div class="website"><p class="title">website</p><div class="ui input">< input name="website" onChange={myChangeHandler} value={state.website} placeholder="Website" /> </div></div>
            <div class="company-logo-url"><p class="title">Company logo url</p>
                <div class="ui input">< input name="logo_url" onChange={myChangeHandler} value={state.logo_url} placeholder="Logo url" /></div></div>
        </div>

        <div class="short-description">
            <p class="title">Short description</p>
            <Editor
                initialValue="<p>This is the initial content of the editor</p>"
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
                onEditorChange={handleEditorChange}
            />
        </div>

        {(state.existing_name) ? <Button onClick={() => setState({ ...state, discard: false })}><Icon name="remove circle" />Discard and Select an Company name</Button> : ""}
    </>);
    return (

        <>

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
                        <div class="quick-pick2">
                            <div> <span class="job-logo"><img src="/images/iconfinder_Sed-05_2232591.png" />a</span>
                                <span>Job</span>
                            </div>
                        </div>
                        <div class="layer1">
                            <div class="job-title"><p class="title">Job Title</p><div class="ui input"><input type="text" name="job_title" placeholder="Front end developer" onChange={myChangeHandler} value={state.job_title} /></div></div>
                            <div class="location"> <p class="title">Location</p> <div class="ui input"><input name="location" placeholder="Pick a location e.g. Tokyo" onChange={myChangeHandler} value={state.location} /></div></div>
                            <div class="remote-type"><p class="title">Remote-working</p>

                                <Dropdown
                                    placeholder='Remote Job Or Not'
                                    name="remote"
                                    onChange={dropdownChangeHandler}
                                    fluid
                                    selection
                                    options={remoteOptions}
                                />
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
                                />
                            </div>
                        </div>
                        <div class="layer2">
                            <div class="salary"> <p class="title">Salary</p><div class="ui input"><input name="salary" placeholder="25000$-35000$" onChange={myChangeHandler} value={state.salary} /></div></div>
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
                                </div>
                            </div>
                            <div class="apply">
                                <p class="title">Apply url or email</p><div class="ui input"><input name="apply_link" onChange={myChangeHandler} value={state.apply_link} placeholder="Url or email to use in order to apply" /></div></div>
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
                        </div>
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
