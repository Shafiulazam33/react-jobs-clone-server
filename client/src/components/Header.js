import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

export default function Header() {
  return (

    <div class="navbar-wrapper">
      <div class="navbar">
        <Link to="/">
          <div class="navbar-left">
            <img alt="" src="/images/iconfinder_react_js_1322468.png" />
            <span>JOBS</span>
          </div>
        </Link>
        <div class="navbar-right">
          <p class="text1">
            {(localStorage.getItem('auth_token')) ? <Link to="/postjobs">Post-jobs</Link> : <Link to="/signin">Post-jobs</Link>
            }
          </p>
          <p class="text2"><img alt="" src="/images/iconfinder_user-01_186382.png" />
            {(localStorage.getItem('auth_token')) ? <Link to="/profile"> Profile</Link> : <Link to="/signin">Sign In</Link>
            }
          </p>
        </div>
      </div>
    </div>

  )
}
