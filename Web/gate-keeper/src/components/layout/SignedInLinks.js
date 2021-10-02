import React ,{useState , useContext, useEffect} from 'react'
import {  NavLink } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

import M from 'materialize-css'


const SignedInLinks = (props) => {
    
    const {signout} = useContext(AuthContext)
    useEffect(()=>{
        var elems = document.querySelectorAll('.tooltipped');
        var instances = M.Tooltip.init(elems, {})
    })

    
    return (
        <ul className="right">
            {/* <li><NavLink to="/dashboard">Dashboard</NavLink></li> */}
            <li><a onClick={signout}><i className="material-icons  white-text tooltipped" data-position="bottom" data-tooltip="Sign Out">logout</i></a></li>
            {/* <li><NavLink to="/" className="btn btn-floating yello darken-5">AB</NavLink></li> */}
        </ul>

    )
}



export default SignedInLinks
