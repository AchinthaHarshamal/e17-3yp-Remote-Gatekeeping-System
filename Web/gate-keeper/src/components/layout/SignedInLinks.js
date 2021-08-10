import React from 'react'
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { signOut } from '../../store/actions/authActions';


const SignedInLinks = (props) => {
    
    return (
        <ul className="right">
            <li><NavLink to="/dashboard">Dashboard</NavLink></li>
            <li><a onClick = {props.signOut}>Log Out</a></li>
            <li><NavLink to="/" className="btn btn-floating yello darken-5">{props.profile.initials}</NavLink></li>
        </ul>

    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut :  () => dispatch(signOut()) 
    }
}

export default connect(null , mapDispatchToProps)(SignedInLinks)
