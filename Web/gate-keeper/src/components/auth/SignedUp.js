import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import {connect} from 'react-redux'
import { signUp } from '../../store/actions/authActions'

export class SignedUp extends Component {

    state = {
        firstName :'',
        lastName : '',
        productId : this.props.nodeId,
        email:'',
        password:''
    }
    handleChange = (e) => {
        //console.log(e);
        this.setState({
            [e.target.id]:e.target.value
        })
    }
    handleSubmit =(e)=>{
        
        e.preventDefault();
        //console.log(this.state);
        this.props.signUp(this.state)
    }


    render() {
        const {auth,nodeAvilable} = this.props
        //console.log(nodeAvilable)
        if(auth.uid) {
            return <Redirect to='/dashboard'/>
        }else if(!nodeAvilable){
            
            return <Redirect to='/authnode'/>
        }

        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} className="white">
                     {/*Title SignedUp*/}
                    <div className="row">
                        <h5 className="col s12 m6 grey-text text-darken-3">Create Your Account</h5>
                    </div>
                    
                    {/* input fileds  */}
                    <div className="row">
                        {/* first name */}
                        <div className="input-field col s12 m6">
                            <label htmlFor="firstName">First Name</label>
                            <input type="text" id="firstName" onChange={this.handleChange}/>
                        </div>
        
                        {/* last name */}
                        <div className="input-field col s12 m6">
                            <label htmlFor="lastName">Last Name</label>
                            <input type="text" id="lastName" onChange={this.handleChange}/>
                        </div>

                        {/* product ID */}
                        <div className="input-field col s12 m6">
                            <label htmlFor="productId" >Product ID </label>
                            <input type="text" id="productId"  value={this.state.productId}/> 
                            
                        </div>
                       
                        {/* email */}
                        <div className="input-field col s12 m6">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" onChange={this.handleChange}/>
                        </div>
                        
                        {/* password */}
                        <div className="input-field col s12 m6">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" onChange={this.handleChange}/>
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
}


const mapStateToProps = (state) => {
    return {
        auth : state.firebase.auth,
        nodeAvilable : state.auth.nodeAvilable,
        nodeId : state.auth.nodeId
       
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        signUp : (newUser) => dispatch(signUp(newUser))
    }
}

export default connect(mapStateToProps ,mapDispatchToProps)(SignedUp)

 