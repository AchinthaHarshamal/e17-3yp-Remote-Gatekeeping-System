import React , {useContext} from 'react'
import { Redirect } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import Dowonload from './Dowonload'
import Banner from './Banner'


const  HomePage = () => {

    const {user} = useContext(AuthContext)

    if(user != null) { return <Redirect to='/dashboard'/> }
 
    return (
        <div className="container">
            <div className="home grey darken-3">
                <div className="row">
                    <div className="col  s12 m8  grey lighten-2">
                        <Banner />
                    </div>
                    
                    <div className="col  s12 m4 grey lighten-3 ">
                        <Dowonload />
                    </div>
                </div>
            
            </div>
        </div>
        
    )
}

export default HomePage