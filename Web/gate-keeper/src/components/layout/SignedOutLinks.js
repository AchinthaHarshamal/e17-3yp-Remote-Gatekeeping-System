import React , {useEffect}from 'react';
import { NavLink } from 'react-router-dom';
import M from 'materialize-css'

const SignedOutLinks = ()=> {

    useEffect(()=>{
        var elems = document.querySelectorAll('.tooltipped');
        var instances = M.Tooltip.init(elems, {});
    })

    return (
        <ul className="right navIcon hide-on-med-and-down">
            {/* <li><NavLink to="/signin">Sign In</NavLink></li> */}
           
            <li> <NavLink to="/signin">
                <i className="material-icons tooltipped" data-position="bottom" data-tooltip="Sign In">login</i>
            </NavLink></li>
           
            <li><NavLink to="/authnode">
                <i className="material-icons  white-text tooltipped" data-position="bottom" data-tooltip="Connect Device">cable</i>
            </NavLink></li>

            <li><a href="#!">
                <i className="material-icons  white-text tooltipped" data-position="bottom" data-tooltip="FAQ">contact_support</i>
            </a></li>
   
        </ul>
    )
}

export default SignedOutLinks
