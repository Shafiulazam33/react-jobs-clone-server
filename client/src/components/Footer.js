import React from 'react'
import { Link } from 'react-router-dom'
export default function Footer() {
    return (
        <div>
            <ul>Connect<li>facebook</li><li>twitter</li></ul>
            <ul>Hear from us<li><input/></li><li><button>Subscribe</button></li></ul>
            <ul>Support
                <Link to="/faq"><li>Faq</li></Link>
                <Link to="/privacy"><li>Privacy policy</li></Link>
                <li>Contact us</li>
            </ul>
            <ul> © React {"<Jobs />"}
                <li>Not affiliated with Facebook.</li>
            </ul>
        </div>
    )
}
