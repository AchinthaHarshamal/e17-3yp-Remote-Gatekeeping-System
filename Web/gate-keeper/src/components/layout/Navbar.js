import React ,{useContext } from 'react';
import {Link} from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext'

import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import SideNavbar from './SideNavbar';
import SideNavDashboard from '../dashbord/SideNavDashboard';
import { DataContext } from '../../contexts/DataContext';


const Navbar =()=> {


    const {user} = useContext(AuthContext)
    const {dataLoaded} = useContext(DataContext)
   

    const links = () =>{
    
        const navLink =  user && dataLoaded ? <SignedInLinks /> : <SignedOutLinks /> 
        const sideBar = user && dataLoaded ? <SideNavDashboard /> : <SideNavbar/>
        const target = user && dataLoaded ?  'dashboardNav' : 'signedInNav' 
       
        return(
            <div className ="navContainer">
                {navLink}
                <a href="#menu" data-target={target} className="sidenav-trigger"><i id='menu' className="material-icons">menu</i></a>
                {sideBar}
                
            </div>
        )
        
    }
   
   
    
    //console.log(user)
    return (
        <div>
            <nav className="nav-wraper indigo lighten-1 z-depth-2">
                <div>
                    <Link to='/' id='title' className="brand-logo center white-text offsetC ">Gate Keeper</Link>
                    {links()}
                </div>
            </nav>
        </div>
    )

}


export default Navbar
