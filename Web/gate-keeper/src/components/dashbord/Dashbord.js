import React , {useContext , useState , useEffect} from 'react'
import {Redirect} from 'react-router-dom'

import { AuthContext } from '../../contexts/AuthContext'

const  Dashbord = ()=> {

    const {user} = useContext(AuthContext)
   


    

    if(user ==null)  {
        return <Redirect to='/'/>
    }   

    return (
        <div className='container offsetC'>
            <h1>Hello</h1>
           
        </div>
        
    )
}

export default Dashbord
