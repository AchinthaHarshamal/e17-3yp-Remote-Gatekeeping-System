import React , {useState , useEffect, useContext} from "react"
import { DataContext } from "../../../contexts/DataContext"

import NodeStatus from "./NodeStatus"
import Users from "./Users"
import MailBoxStatus from "./MailBoxStatus"
import MsgTable from "./MsgTable"




const MainBoard = () => {

    const [msg, setMsg] = useState({
        'event' : '0',
        'from' : 'Bot' ,
        'to' : 'All',
        'msgUrl' : 'testUrl',
        'msgType' : 'text',
        'time': (new Date()).toJSON()
    })
    const {getMessages,getUserInfo } = useContext(DataContext)
    
    //offset-m4
    return (
        <div className="container">
            <div className="row">
                <div className="col s12 m4">
                    <NodeStatus />
                </div>
                <div className="col s12 m4 ">
                    <Users />
                </div>
                <div className="col s12 m4 ">
                    <MailBoxStatus />
                </div>
                <div className="col s12">
                    
                    <MsgTable />
                </div>
            </div>
            
        </div>
    )
}

export default MainBoard
