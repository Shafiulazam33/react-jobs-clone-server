import React, { useState, useEffect, useRef } from 'react'
import Axios from 'axios'
import jwtDecode from 'jwt-decode'
import StripeCheckout from 'react-stripe-checkout';
import { Button, Icon, Label } from 'semantic-ui-react'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch,
    useHistory
} from "react-router-dom";
let token = localStorage.getItem('auth_token');
if (token) {
    let decode = jwtDecode(token);
}

var Featured = (props) => {
    let { job_id } = useParams()
    const funcstripe = () => {

    }
    const onToken = (token) => {
        console.log(token)
        Axios.post('http://localhost:4000/api/job/payfor-feature', { ...token, job_id })
            .then((res) => {
                console.log(res)
            })
            .catch(error => {
                console.log(error)
            })
    }
    return (
        <div>
            <StripeCheckout
                token={onToken}
                name="React Jobs"
                description="Make Featured Your Post"
                //email={decode.email}
                ComponentClass="div"
                panelLabel="Ready To Pay"
                amount={100 * 100}
                currency="USD"
                stripeKey={"pk_test_90w6ttibPuPDAMqNfn9UovZ100qQ6W35nh"}
            >
                <Button as='div' labelPosition='right'>
                    <Button color='blue'>
                        Promote
      </Button>
                    <Label as='a' basic color='blue' pointing='left'>
                        $100
      </Label>
                </Button>
            </StripeCheckout>
        </div>
    )
}
export default Featured;