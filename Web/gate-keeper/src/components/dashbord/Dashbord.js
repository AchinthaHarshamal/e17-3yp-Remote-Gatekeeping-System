import React, { Component } from 'react';
import {connect} from 'react-redux';
import Messages from './Messages';
import {firestoreConnect} from 'react-redux-firebase'
import { compose } from 'redux';

class Dashbord extends Component {

    render() {
        //console.log(this.props.messages)
        const {messages} = this.props;
        //console.log(messages)
        
        
        return (
            <div className="container">
                <h1>Hello Dashboard</h1> 
                    <Messages messages={messages}/>
                 {/*res*/}

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
        messages : state.firestore.ordered.messages
    }
}



export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection : 'messages'}
    ])
)(Dashbord);

