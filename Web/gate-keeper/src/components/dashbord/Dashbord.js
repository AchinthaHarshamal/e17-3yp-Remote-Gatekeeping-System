import React , {useContext } from 'react'
import {Redirect} from 'react-router-dom'
import {BrowserRouter ,Switch, Route} from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext'
import MainBoard from './status/MainBoard';
import UserManagement from './UserManagement';

const  Dashbord = ()=> {

    const {user} = useContext(AuthContext)
   
    if(user ==null)  {
        return <Redirect to='/'/>
    }   

    return (
        <div className="offsetC">
          
                <Switch>
                    <Route  path= '/dashboard/manage'> <UserManagement /></Route>
                    <Route  path='/dashboard' > <MainBoard /></Route>
                </Switch>
            
        </div>
        
    )
}

export default Dashbord
