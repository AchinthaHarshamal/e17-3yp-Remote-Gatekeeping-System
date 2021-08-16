import React from 'react';
import {Link} from 'react-router-dom';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import './navbar.css'
// Auth state
import { connect } from 'react-redux';


const Navbar =(props)=> {

    const {auth, profile} = props ;
    //console.log(auth)
    const links = auth.uid ? <SignedInLinks profile={profile} /> : <SignedOutLinks /> ;
    return (
        <div>
            <nav className="nav-wraper blue darken-2">
                <div>
                    <Link to='/' className="brand-logo center black-text">RGK</Link>
                    {links}
                </div>
            </nav>
            
        </div>
    )
}

const mapStateToProps = (state) =>{
    //console.log(state);
    return{
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}
export default connect(mapStateToProps)(Navbar)
