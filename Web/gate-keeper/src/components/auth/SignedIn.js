import React, { setState , useState,useContext } from 'react'
import { Redirect } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'




function SignedIn() {

    const initValues = { email : '' , password: ''} 

    const {signin} = useContext(AuthContext)
    const [values, setValues] = useState(initValues)


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
        const auth  = await signin(values)
        console.log(auth.user.uid);
        
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
                    <button className="btn blue lighten-1 z-depth-0">Sign In</button>
                    <div className="red-text center">
                        {/* {authError ? <p> {authError} </p> : null} */}
                    </div>
                </div>
            </form>

        </div>
    )
}

export default SignedIn



