import React, { useState , useContext } from 'react'
import { Redirect } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import {InitContext} from '../../contexts/InitContext'
import { DataContext } from '../../contexts/DataContext'


import UploadImg from '../dashbord/UploadImg'


const  SignedUp = () => {

    const {user, signup} = useContext(AuthContext)
    const {serialNumber,nodeInit} = useContext(InitContext)
    const {dataLoaded ,setDataLoaded} = useContext(DataContext)
    const [userInfo, setUserInfo] = useState({
        firstName :'',
        lastName : '',
        email:'',
        password:'',
        confirmpassword:''
    })
    const [image, setImage] = useState()
    
    const handleChange = (e) => {
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
            //console.log("UserCredential : " , userCredential.user.uid)
            await nodeInit(userCredential.user.uid,userInfo.firstName, userInfo.lastName ,  userInfo.email, image)
            
            alert("Node is successfully initialized!")
            setDataLoaded(true)
        }catch(err){
            alert("Signup Error " , err.message )
            
        }
       
    }

   
    
    if(user !=null && dataLoaded)  {
        
        return <Redirect to='/dashboard'/>
    } 
    
    
    //console.log("seri : " , serialNumber)   
    if(serialNumber== null) {return <Redirect to='/'/> }
    return (
        <div className="container signUp-container">
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
                    <div className="col s12 m6">
                        <label htmlFor="productId" >Serial Number</label>
                        <input type="text" id="productId"  value = {serialNumber}  disabled /> 
                        
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

                     {/* confirm password */}
                    <div className="input-field col s12 m6">
                        <label htmlFor="Confirmpassword">Confirm Password</label>
                        <input type="password" id="confirmpassword" onChange={handleChange}/>
                    </div>


                    
                </div>
                <div className="row">
                    <div className="col s12 m4 grey-text">
                        <label htmlFor="uploadimage">Profile Picture </label>
                        <UploadImg  setFile = {setImage} />
                    </div>
                </div>  

                {/*Submit Button*/}
                <div className="row">
                    <div className="input-field col s12 m2 offset-m10">
                        
                        <button className="btn grey darken-2 z-depth-0" id="signup-btn">Sign Up</button>
                    </div>
                </div>   
            </form>
        </div>
    )
}

export default SignedUp







 