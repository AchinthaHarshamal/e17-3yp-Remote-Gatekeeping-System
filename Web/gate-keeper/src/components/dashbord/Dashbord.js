import React, { Component } from 'react';
import {connect} from 'react-redux';
import Messages from './Messages';
import {firestoreConnect} from 'react-redux-firebase'
import { compose } from 'redux';
import { Redirect } from 'react-router-dom'

class Dashbord extends Component {

    render() {
       
        const {messages , auth } = this.props;
        //console.log(messages)
        if(!auth.uid) return <Redirect to='/'/>
        
        
        return (
            <div className="container">
                <h1>Hello Dashboard</h1> 
                    <Messages messages={messages}/>
                

            </div>
        ) 
    }
}

const mapStateToProps =(state) => {
    //console.log('state ' , state)
    //console.log('fb' ,state.firestore.ordered.messages)
    //console.log("dboard " , state.dboard.messages)
    return {
        // messages: state.dboard.messages
        messages : state.firestore.ordered.messages,
        auth : state.firebase.auth

    }
}



export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection : 'messages'}
    ])
)(Dashbord);

