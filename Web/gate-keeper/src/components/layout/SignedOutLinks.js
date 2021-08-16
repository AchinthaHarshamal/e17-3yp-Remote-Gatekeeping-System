import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import SignedIn from '../auth/SignedIn';
import SignedUp from '../auth/SignedUp';
import AuthNode from '../auth/AuthNode';


const SignedOutLinks = ()=> {
    return (
        <ul className="right">
            <li><NavLink to="/signin">Sign In</NavLink></li>
            <li><NavLink to="/authnode">Getting Started!</NavLink></li>
        </ul>
    )
}

export default SignedOutLinks
