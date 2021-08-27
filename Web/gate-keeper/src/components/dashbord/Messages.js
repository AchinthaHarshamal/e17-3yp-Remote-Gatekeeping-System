import React from 'react'


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




export default Messages
