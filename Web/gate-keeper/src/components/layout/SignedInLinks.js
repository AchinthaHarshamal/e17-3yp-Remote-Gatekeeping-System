import React from 'react'
import {  NavLink } from 'react-router-dom';


const SignedInLinks = (props) => {
    
    return (
        <ul className="right">
            <li><NavLink to="/dashboard">Dashboard</NavLink></li>
            <li><a>Log Out</a></li>
            <li><NavLink to="/" className="btn btn-floating yello darken-5">AB</NavLink></li>
        </ul>

    )
}



export default SignedInLinks
