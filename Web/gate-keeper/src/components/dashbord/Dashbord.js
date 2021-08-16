import React, { Component } from 'react';
import {connect} from 'react-redux';
import Messages from './Messages';
import {firestoreConnect ,isLoaded} from 'react-redux-firebase'
import { compose } from 'redux';
import { Redirect } from 'react-router-dom'


class Dashbord extends Component {

    loadComponent = (authId) =>{
        if(isLoaded(authId)){
            return(
                <div>
                    <h3>Hello User</h3> 
                    <h5>History of conversation</h5>
                     <Messages  authId = {authId}/>
                </div>
            )
        }
        else (
                <div>
                    <h1>Loading...</h1> 
                </div>
        )
    }

    render() {
       
        const {auth} = this.props;
        //console.log(messages)

        if(!auth.uid) return <Redirect to='/'/>
        
        return (
            <div className="container">
                {this.loadComponent(auth.uid)}
            </div>
        ) 
    }
}

const mapStateToProps =(state) => {
    // console.log('state ' , state)
    // console.log('fb' ,state.firestore.ordered.messages)
    // console.log('fb' ,state.firefase)

    //console.log("dboard " , state.dboard.messages)
    return {
        // messages: state.dboard.messages
        auth : state.firebase.auth,
        profile: state.firebase.profile
    }
}



export default connect(mapStateToProps)(Dashbord);

