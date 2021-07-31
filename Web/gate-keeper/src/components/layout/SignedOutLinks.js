import React from 'react';
import { Link, NavLink } from 'react-router-dom';


const SignedOutLinks = ()=> {
    return (
        <ul className="right">
            <li><NavLink to="/">Sign In</NavLink></li>
            <li><NavLink to="/">Sign Up</NavLink></li>
        </ul>
    )
}

export default SignedOutLinks
