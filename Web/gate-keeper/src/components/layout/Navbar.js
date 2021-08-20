import React from 'react';
import {Link} from 'react-router-dom';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import './navbar.css'



const Navbar =(props)=> {

    // {auth, profile} = props ;
    //console.log(auth)
    //const links = auth.uid ? <SignedInLinks profile={profile} /> : <SignedOutLinks /> ;
    return (
        <div>
            <nav className="nav-wraper">
                <div>
                    <Link to='/' className="brand-logo center white-text">Remote Gatekeeping System</Link>
                    <SignedInLinks/>
                    <SignedOutLinks />
                    {/* {links} */}
                </div>
            </nav>
            
        </div>
    )
}


export default Navbar
