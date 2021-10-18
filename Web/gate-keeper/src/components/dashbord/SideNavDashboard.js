import React , {  useEffect , useContext} from 'react'
import { AuthContext } from '../../contexts/AuthContext';
import { DataContext } from '../../contexts/DataContext';
import M from 'materialize-css'
import { Link  } from 'react-router-dom';




const  SideNavDashboard = () => {
    
    const {signout} = useContext(AuthContext)
    const {userInfo  } = useContext(DataContext)
    
    useEffect(() => {
        const elems = document.querySelectorAll('.sidenav');
        M.Sidenav.init(elems,{});
    })

   
    return (
        <div>
            <ul id="dashboardNav" className="sidenav sidenav-fixed z-depth-0 indigo lighten-3">
                <li>
                    <div className="user-view  indigo lighten-2 font1 ">
                        <div className="background ">
                        </div>
                            <a href="#user">
                                <img alt='Profile-Pic' className="circle" src={userInfo.imgUrl} />
                            </a>
                            <a href="#name"><span className="black-text name ">{userInfo.fName + " " +  userInfo.lName}</span></a>
                            <a href="#email"><span className="black-text email">{userInfo.email}</span></a>
                    </div>
                </li>
            
                <div className="font1">
                    <li > <Link to = '/dashboard'><i id='dashboard'className="material-icons white-text">dashboard</i>Dashboard</Link></li>
                    <li ><Link to = '/dashboard/account-setting'><i id='account-setting' className="material-icons  white-text">perm_identity</i>Accounte Setting</Link></li>
                    <li ><Link to = '/dashboard/manage'><i id='manage' className="material-icons  white-text">supervisor_account</i>Manage Users</Link></li>
                    <li ><Link to = '/' onClick={signout}><i id='home' className="material-icons  white-text">home</i>Home</Link></li>
                    <li ><Link to='' onClick={signout}><i id='side-signout' className="material-icons  white-text">logout</i>SignOut</Link></li>
                </div>
                
            </ul>
           

            </div>
    )
}

export default SideNavDashboard
