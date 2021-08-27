import React ,{useState , useContext} from 'react'
import {  NavLink } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';



const SignedInLinks = (props) => {
    
    const {signout} = useContext(AuthContext)
    
    return (
        <ul className="right">
            <li><NavLink to="/dashboard">Dashboard</NavLink></li>
            <li><a onClick={signout}>Log Out</a></li>
            <li><NavLink to="/" className="btn btn-floating yello darken-5">AB</NavLink></li>
        </ul>

    )
}



export default SignedInLinks
