import React from 'react';
import {Link} from 'react-router-dom';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
// Auth state
import { connect } from 'react-redux';


const Navbar =()=> {
    return (
        <div>
            <nav className="nav-wraper  indigo darken-2">
                <div>
                    <Link to='/' className="brand-logo center">RGK</Link>
                    <SignedInLinks />
                    <SignedOutLinks />
                </div>
            </nav>
            
        </div>
    )
}

const mapStateToProps = (state) =>{
    console.log(state);
    return{

    }
}
export default connect(mapStateToProps)(Navbar)
