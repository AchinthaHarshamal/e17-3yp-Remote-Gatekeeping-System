import React ,{useContext} from "react"
import { DataContext } from "../../../contexts/DataContext"

import NodeStatus from "./NodeStatus"

import MailBoxStatus from "./MailBoxStatus"
import MsgTable from "./MsgTable"
import EventCount from "./EventCount"
import Chart from "./Chart"




const MainBoard = () => {

    const {userInfo  } = useContext(DataContext)
    
    
    return (
        <div className="container mainBoard">
             <div className="row topic">
                 <h5>Hello {userInfo.fName} 👋👋👋</h5>
                 <p>Welcome to Dashboard</p>
             </div>
            <div className="row">
                <div className="col s12 m4">
                    <NodeStatus />
                </div>
                
                <div className="col s12 m4 ">
                    <MailBoxStatus />
                </div>
                <div className="col s12 m4 ">
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
