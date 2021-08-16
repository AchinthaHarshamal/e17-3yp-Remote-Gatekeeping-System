import React from 'react'
import { connect } from 'react-redux'
import { downloadMsg } from '../../store/actions/messageAction'

import {firestoreConnect ,isLoaded} from 'react-redux-firebase';
import { compose } from 'redux';



const  Messages  = (props) =>  {

   
    const {messages ,authId, downloadMsg} = props
    //console.log("inside" ,messages , authId)
    const rows = messages &&  messages.map( (msg) =>{
        //console.log('authid' ,authId)
        return (
           
            //onClick={() => {downloadMsg(authId)}}
            <tr key = {msg.id} >
                <td>{msg.from}</td>
                <td>{msg.to}</td>
                <td>{msg.dataType}</td>
                {/* <td>{msg.time.toDate().toString()}</td> */}
                {msg.time ? <td> {msg.time.toDate().toString()} </td> : null}
            </tr>

        )
    })
    
    return (
       

        <table className="striped highlighth responsive-table">
            <thead>
                <tr>
                    <th>From</th>
                    <th>To</th>
                    <th>Messate Type</th>
                    <th>Time</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>



    )
}

const mapDispatchToProps = (dispatch) =>{
    return{
        downloadMsg : (id) => dispatch(downloadMsg(id))
    }
}

const mapStateToProps =(state) => {
    // console.log('state ' , state)
    // console.log('fb' ,state.firestore.ordered.messages)
    //console.log('fb' ,state.firestore)

    //console.log("dboard " , state.dboard.messages)
    return {
        //messages: state.dboard.messages

        messages : state.firestore.ordered.messages,
    }
}


export default compose(
    connect(mapStateToProps , mapDispatchToProps),
    firestoreConnect(props =>[
        {
            
            collection : 'users',
            doc: props.authId,
            subcollections: [
                { collection: 'messages'}
               ],
            storeAs : 'messages'
        }]
)
    
)(Messages)
