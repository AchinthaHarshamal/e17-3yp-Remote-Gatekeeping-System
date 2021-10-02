import React , {useContext} from "react"
import { DataContext } from "../../../contexts/DataContext"
import moment from 'moment'

const MsgTable = () => {

    const {messages} = useContext(DataContext)

    const rows = messages && Object.values(messages).map( (msg) =>{
       //console.log()
        return (
            <tr key = {msg.event+ Math.random()} >
                <td>{msg.from}</td>
                <td>{msg.to}</td>
                <td>{msg.msgType}</td>
                <td> {moment(msg.time).calendar()} </td> 
            </tr>

        )
    })
    
    return (
        <div className="mainTable ">
            <h5>Message History</h5>
            <table className="striped highlighth z-depth-3">
                <thead className="green z-depth-1 ">
                    <tr>
                        <th>From</th>
                        <th>To</th>
                        <th>Message Type</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        </div>
    )
}

export default MsgTable
