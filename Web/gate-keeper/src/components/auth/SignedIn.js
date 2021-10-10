import React, { useState,useContext} from 'react'
import { Redirect } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import { DataContext } from '../../contexts/DataContext'


function SignedIn() {

    const initValues = { email : '' , password: ''} 
    const {signin ,user} = useContext(AuthContext)
    const {setDataLoaded ,dataLoaded} = useContext(DataContext)
    const [values, setValues] = useState(initValues)
    const [errorMsg, setErrorMsg] = useState(null)

    const handleChange = (e) => {
        const {id , value} = e.target
        setValues({
           ...values,
           [id] :value
        })
    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            await signin(values)
            setErrorMsg(null)
            setDataLoaded(true)
        }catch(err){
            setErrorMsg("Wrong Password or Email ! Try again")
        }
    }
    if(user != null && dataLoaded)  {
        return <Redirect to='/dashboard'/>
    }
    return (  
        <div className="container">
            <form onSubmit={handleSubmit} className="white">
                <h5 className="grey-text text-darken-3">Sign In</h5>
                <div className="input-field">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" onChange={handleChange}/>
                </div>
                
                <div className="input-field">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" onChange={handleChange}/>
                </div>

                <div className="input-field">
                    <button id = 'signin-submit'className="btn grey darken-2 z-depth-0">Sign In</button>
                    <div className="red-text center">
                              
                    {errorMsg ? <p>{errorMsg}</p> : null}
                    </div>
                </div>
            </form>

        </div>
    )
}

export default SignedIn



