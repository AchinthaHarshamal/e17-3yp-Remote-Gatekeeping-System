import React , {useEffect , useContext} from 'react'
import { AuthContext } from '../../contexts/AuthContext';
import { DataContext } from '../../contexts/DataContext';
import M from 'materialize-css'




const  SideNavDashboard = () => {
    
    const {signout} = useContext(AuthContext)
    const {userInfo} = useContext(DataContext)

    useEffect(() => {
        const elems = document.querySelectorAll('.sidenav');
        M.Sidenav.init(elems,{});
    })

    return (
        <div>
            <ul id="dashboardNav" className="sidenav sidenav-fixed z-depth-0 grey darken-3">
                <li>
                    <div className="user-view grey darken-4">
                        <div className="background ">
                        </div>
                            <a href="#user">
                                <img className="circle" src="https://ichef.bbci.co.uk/news/976/cpsprodpb/6D6A/production/_116101082_cruise_reuters.jpg" />
                            </a>
                            <a href="#name"><span className="white-text name">John Doe</span></a>
                            <a href="#email"><span className="white-text email">jdandturk@gmail.com</span></a>
                        
                    </div>
                </li>
            
                    
                <li className="side-nav-color"><a href="#!"><i className="material-icons white-text">dashboard</i>Dashboard</a></li>
                <li><a href="#!" ><i className="material-icons  white-text">perm_identity</i>Accounte Setting</a></li>
                <li><a href="#!"><i className="material-icons  white-text">supervisor_account</i>Manage Users</a></li>
                <li><a href="#!"><i className="material-icons  white-text">home</i>Home</a></li>
                <li><a href="#!" onClick={signout}><i className="material-icons  white-text">logout</i>SignOut</a></li>
            </ul>
           

            </div>
    )
}

export default SideNavDashboard
