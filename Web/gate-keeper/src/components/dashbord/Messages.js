import React from 'react'
import { connect } from 'react-redux'
import { downloadMsg } from '../../store/actions/messageAction'
import downloadImage from '../../img/download.jpg'


const  Messages  = ({messages , downloadMsg}) =>  {

    console.log("inside" ,messages)
    const rows = messages &&  messages.map( (msg) =>{
      
        return (
            
            <tr key = {msg.id} onClick={() => {downloadMsg(msg.id)}}>
                <td>{msg.from}</td>
                <td>{msg.to}</td>
                <td>{msg.dataType}</td>
                <td>{msg.id}</td>
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
