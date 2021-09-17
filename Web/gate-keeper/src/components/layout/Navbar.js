import React ,{useContext , useEffect} from 'react';
import {Link} from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext'

import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import SideNavbar from './SideNavbar';
import SideNavDashboard from '../dashbord/SideNavDashboard';


const Navbar =(props)=> {


    const {user} = useContext(AuthContext)
    const profile = {}

    const links = () =>{
    
        const navLink = user ? <SignedInLinks profile={profile} /> : <SignedOutLinks /> 
        const sideBar = user ? <SideNavDashboard /> : <SideNavbar/>
        const target = user ?  'dashboardNav' : 'signedInNav' 
       
        return(
            <div className ="navContainer">
                {navLink}
                <a href="#" data-target={target} className="sidenav-trigger"><i className="material-icons">menu</i></a>
                {sideBar}
                
            </div>
        )
        
    }
   
   
    
    //console.log(user)
    return (
        <div>
            <nav className="nav-wraper grey darken-4 z-depth-0">
                <div>
                    <Link to='/' className="brand-logo center white-text offsetC">Smart Keeper</Link>
                    {links()}
                </div>
            </nav>
        </div>
    )

}


export default Navbar
