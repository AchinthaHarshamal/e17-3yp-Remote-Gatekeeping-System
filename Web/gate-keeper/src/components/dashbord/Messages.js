import React from 'react'
import { connect } from 'react-redux'
import { downloadMsg } from '../../store/actions/messageAction'
import downloadImage from '../../img/download.jpg'


const  Messages  = ({messages ,authId, downloadMsg}) =>  {

    //console.log("inside" ,messages)
    const rows = messages &&  messages.map( (msg) =>{
        //console.log('authid' ,authId)
        return (
           
            <tr key = {msg.id} onClick={() => {downloadMsg(authId)}}>
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


export default connect(null , mapDispatchToProps)(Messages)
