import React, { useState , useContext} from 'react'
import { Redirect } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import { DataContext } from '../../contexts/DataContext'


const  SignedUp = () => {

    const {userId , signup} = useContext(AuthContext)
    const {serialNumber} = useContext(DataContext)
    const [userInfo, setUserInfo] = useState({
        firstName :'',
        lastName : '',
        productId : '',
        email:'',
        password:''
    })


    const handleChange = (e) => {
        //console.log(e);
        const {id , value} = e.target
        setUserInfo({
           ...userInfo,
           [id] :value
        })
    }
    const handleSubmit =async (e)=>{
        
        e.preventDefault();

        
        try{
            const userCredential = await signup({email : userInfo.email ,password: userInfo.password})
            console.log("UserCredential : " , userCredential)
        }catch(err){
            console.log("Error  : " , err.code)
        }
          
 
        //console.log(this.state);
       
    }

    if(userId)  {
        return <Redirect to='/dashboard'/>
    }     

    // console.log("serialNumber == null" , serialNumber == null , "serialNumbe :", serialNumber)
    // if(serialNumber == null){
    //     return <Redirect to='/authnode'/>
    // }

    return (
        <div className="container">
            <form onSubmit={handleSubmit} className="white">
                {/*Title SignedUp*/}
                <div className="row">
                    <h5 className="col s12 m6 grey-text text-darken-3">Create Your Account</h5>
                </div>
                
                {/* input fileds  */}
                <div className="row">
                    {/* first name */}
                    <div className="input-field col s12 m6">
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" id="firstName" onChange={handleChange}/>
                    </div>

                    {/* last name */}
                    <div className="input-field col s12 m6">
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" id="lastName" onChange={handleChange}/>
                    </div>

                    {/* product ID */}
                    <div className="input-field col s12 m6">
                        <label htmlFor="productId" >Product ID </label>
                        <input type="text" id="productId"  /> 
                        
                    </div>
                
                    {/* email */}
                    <div className="input-field col s12 m6">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" onChange={handleChange}/>
                    </div>
                    
                    {/* password */}
                    <div className="input-field col s12 m6">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" onChange={handleChange}/>
                    </div>
                    
                </div>

                {/*Submit Button*/}
                <div className="row">
                    <div className="input-field col s12 m12">
                        <button className="btn blue lighten-1 z-depth-0" id="signup-btn">Sign Up</button>
                    </div>
                </div>   
            </form>
        </div>
    )
}

export default SignedUp







 