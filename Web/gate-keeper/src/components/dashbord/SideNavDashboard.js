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

    const logout =() => {
        alert('Confirm to sign out !')
        signout()
    }

   
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
                    <li ><Link to = '/dashboard/account-setting'><i id='account-setting' className="material-icons  white-text">perm_identity</i>Account Setting</Link></li>
                    <li ><a href = 'https://www.google.com/maps/place/Department+of+Computer+Engineering/@7.2546422,80.5913459,15z/data=!4m2!3m1!1s0x0:0xc4bb2a3c76b588ac?sa=X&ved=2ahUKEwivzPH1_uDzAhXXfn0KHYDoA9gQ_BJ6BAhdEAU'>
                        <i id='account-setting' className="material-icons  white-text">location_on</i>
                        Service Center
                    </a></li>

                    <li ><a href = 'https://wa.me/0810000000'>
                        <i id='account-setting' className="material-icons  white-text">help_center</i>
                        Instant help
                    </a></li>
                   
                    
                    <li ><Link to='' onClick={logout}><i id='side-signout' className="material-icons  white-text">logout</i>Sign Out</Link></li>
                </div>
                
            </ul>
           

            </div>
    )
}

export default SideNavDashboard
