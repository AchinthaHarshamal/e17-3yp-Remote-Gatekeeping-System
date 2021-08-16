import React, { Component } from 'react';
import {connect} from 'react-redux';
import Messages from './Messages';
import {firestoreConnect ,isLoaded} from 'react-redux-firebase'
import { compose } from 'redux';
import { Redirect } from 'react-router-dom'


class Dashbord extends Component {

    loadComponent = (messages ,authId) =>{
       
        console.log('messages' ,messages)
        if(isLoaded(messages)){
            
            return(
                <div>
                    <h1>Hello Dashboard</h1> 
                     <Messages messages={messages} authId = {authId}/>
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
       
        const {messages , auth} = this.props;
        //console.log(messages)
        
        if(!auth.uid) return <Redirect to='/'/>
        
        
        
        return (
            <div className="container">
                
                {this.loadComponent(messages,auth.uid)}
            </div>
        ) 
    }
}

const mapStateToProps =(state) => {
    // console.log('state ' , state)
   // console.log('fb' ,state.firestore.ordered.messages)
    // console.log('fb' ,state.firestore)

    //console.log("dboard " , state.dboard.messages)
    return {
        // messages: state.dboard.messages
        messages : state.firestore.ordered.messages,
        auth : state.firebase.auth,
        

    }
}



export default compose(
    connect(mapStateToProps),
    
    firestoreConnect(props =>[
            {
                
                collection : 'users',
                doc: props.auth.uid,
                subcollections: [
                    { collection: 'messages'}
                   ],
                storeAs : 'messages'
            }]
    )
)(Dashbord);

