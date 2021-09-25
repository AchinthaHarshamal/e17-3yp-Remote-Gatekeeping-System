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
            <h5 className="grey darken-2">Message History</h5>
            <table className="striped highlighth">
                <thead className="grey darken-1">
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
        </div>
    )
}

export default MsgTable
