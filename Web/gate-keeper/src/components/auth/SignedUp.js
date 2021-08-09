import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import {connect} from 'react-redux'

export class SignedUp extends Component {

    state = {
        firstName :'',
        lastName : '',
        productId : '',
        email:'',
        password:'',

        
    }
    handleChange = (e) => {
        console.log(e);
        this.setState({
            [e.target.id]:e.target.value
        })
    }
    handleSubmit =(e)=>{
        
        e.preventDefault();
        //console.log(this.state);
        
    }


    render() {
        const {auth} = this.props
        if(auth.uid) return <Redirect to='/dashboard'/>
        
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} className="white">
                     {/*Title SignedUp*/}
                    <div className="row">
                        <h5 className="col s12 m6 grey-text text-darken-3">Sign Up</h5>
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
                            <label htmlFor="productId">Product ID</label>
                            <input type="text" id="productId" onChange={this.handleChange}/>
                        </div>
                       
                        {/* email */}
                        <div className="input-field col s12 m6">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" onChange={this.handleChangeh}/>
                        </div>
                        
                        {/* password */}
                        <div className="input-field col s12 m6">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" onChange={this.handleChange}/>
                        </div>
                        
                    </div>

                    {/*Submit Button*/}
                    <div className="row">
                        <div className="input-field col s12 m6">
                            <button className="btn blue lighten-1 z-depth-0">Sign Up</button>
                        </div>
                    </div>   
                </form>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        auth : state.firebase.auth
    }
}

export default connect(mapStateToProps)(SignedUp)

 