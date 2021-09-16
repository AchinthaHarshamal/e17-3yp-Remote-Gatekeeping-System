import React , {useContext} from 'react'
import { Redirect } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import Dowonload from './Dowonload'
import Banner from './Banner'


const  Home = () => {

    const {user} = useContext(AuthContext)

    if(user != null) { return <Redirect to='/dashboard'/> }
 
    return (
        <div className="home">
            <div className="row">
                <div className="col  s12 m7 offset-m1 grey lighten-2">
                    Hello Home
                </div>
                
                <div className="col  s12 m3 grey lighten-3 ">
                    Sampath
                </div>
            </div>
            
        </div>
    )
}

export default Home
