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
            <BrowserRouter>
                <Switch>
                    <Route path='/dashboard' component={MainBoard} />
                    <Route exact path= '/manage' component={UserManagement}/>
                </Switch>
            </BrowserRouter>
        </div>
        
    )
}

export default Dashbord
