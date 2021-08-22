import React ,{useContext} from 'react';
import {Link} from 'react-router-dom';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import { AuthContext } from '../../contexts/AuthContext'


import './navbar.css'



const Navbar =(props)=> {


    const {user} = useContext(AuthContext)
    const profile = {}
    //console.log(auth)
    const links = user ? <SignedInLinks profile={profile} /> : <SignedOutLinks /> ;
   
    return (
        <div>
            <nav className="nav-wraper">
                <div>
                    <Link to='/' className="brand-logo center white-text">Remote Gatekeeping System</Link>
                    {links}
                </div>
            </nav>
            
        </div>
    )
}


export default Navbar
