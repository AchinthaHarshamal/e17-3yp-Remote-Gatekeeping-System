import React, { useState,useContext , useEffect} from 'react'
import { Redirect } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import { DataContext } from '../../contexts/DataContext'






function SignedIn() {

    const initValues = { email : '' , password: ''} 
    const {signin ,user} = useContext(AuthContext)
    const {storeData} = useContext(DataContext)
    const [values, setValues] = useState(initValues)
    const [errorMsg, setErrorMsg] = useState(null)

    const handleChange = (e) => {
        //console.log(e);
        const {id , value} = e.target
        setValues({
           ...values,
           [id] :value
        })
    }
    const handleSubmit = async (e)=>{
        
        e.preventDefault();
        try{
            const credential = await signin(values)
           
            setErrorMsg(null)
        }catch(err){
            //console.log('Error' , err.message)
            setErrorMsg("Wrong Password or Email ! Try again")
        }
    }


    
    if(user != null)  {
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
                    <button className="btn grey darken-2 z-depth-0">Sign In</button>
                    <div className="red-text center">
                              
                    {errorMsg ? <p>{errorMsg}</p> : null}
                    </div>
                </div>
            </form>

        </div>
    )
}

export default SignedIn



