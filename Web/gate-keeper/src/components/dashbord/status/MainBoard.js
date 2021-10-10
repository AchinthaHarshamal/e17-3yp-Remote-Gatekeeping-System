import React  from "react"


import NodeStatus from "./NodeStatus"
import Users from "./Users"
import MailBoxStatus from "./MailBoxStatus"
import MsgTable from "./MsgTable"
import EventCount from "./EventCount"
import Chart from "./Chart"




const MainBoard = () => {

    
    
    //offset-m4
    return (
        <div className="container mainBoard">
             <div className="row topic">
                 <h5>Hello Admin</h5>
                 <p>Welcome to Dashboard</p>
             </div>
            <div className="row">
                <div className="col s12 m3">
                    <NodeStatus />
                </div>
                <div className="col s12 m3 ">
                    <Users />
                </div>
                <div className="col s12 m3 ">
                    <MailBoxStatus />
                </div>
                <div className="col s12 m3 ">
                    <EventCount/>
                </div>
                <div className="col s12">
                    <MsgTable />
                </div>
                <div className="col s12">
                    
                    <Chart/>
                    
                    
                </div>  
            </div>
        </div>
    )
}

export default MainBoard
