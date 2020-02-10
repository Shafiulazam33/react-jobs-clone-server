import React, { useState, useEffect } from 'react'


export default function Profilechanger() {
    const [stateemail, setStateemail] = useState({ currentemail: "", newemail: "", confirmemail: "" });
    const [statepass, setStatepass] = useState({ currentpass: "", newpass: "", confirmpass: "" });
    const emailsubmitHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;

        setStateemail({ ...stateemail, [nam]: val });

    }
    const passwordsubmitHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;

        setStatepass({ ...statepass, [nam]: val });

    }
    const { currentemail, newemail, confirmemail } = stateemail;
    const { currentpass, newpass, confirmpass } = statepass;
    return (
        <div>
            <form onSubmit={emailsubmitHandler}>
                <div className='form-group'>
                    <label htmlFor='amount'> Amount: </label>
                    <input
                        type="email"
                        className='form-control'
                        placeholder="Enter Amount"
                        name='currentemail'
                        id='amount'
                        value={currentemail}
                        onChange={emailsubmitHandler}
                    />
                    <input
                        type="email"
                        className='form-control'
                        placeholder="Enter Amount"
                        name='newemail'
                        id='amount'
                        value={newemail}
                        onChange={emailsubmitHandler}
                    />
                    <input
                        type="email"
                        className='form-control'
                        placeholder="Enter Amount"
                        name='confirmemail'
                        id='amount'
                        value={confirmemail}
                        onChange={emailsubmitHandler}
                    />
                    <input
                        type="submit"
                        value="Update email"
                    />
                </div>
            </form>
            <form onSubmit={passwordsubmitHandler}>
                <div className='form-group'>
                    <label htmlFor='amount'> Change password </label>

                    <input
                        type="email"
                        className='form-control'
                        placeholder="Enter Amount"
                        name='currentpass'
                        id='amount'
                        value={currentpass}
                        onChange={passwordsubmitHandler}
                    />

                    <input
                        type="email"
                        className='form-control'
                        placeholder="Enter Amount"
                        name='newpass'
                        id='amount'
                        value={newpass}
                        onChange={passwordsubmitHandler}
                    />
                    <input
                        type="email"
                        className='form-control'
                        placeholder="Enter Amount"
                        name='confirmpass'
                        id='amount'
                        value={confirmpass}
                        onChange={passwordsubmitHandler}
                    />
                    <input
                        type="submit"
                        value="Update email"
                    />
                </div>
            </form>
        </div>
    )
}
