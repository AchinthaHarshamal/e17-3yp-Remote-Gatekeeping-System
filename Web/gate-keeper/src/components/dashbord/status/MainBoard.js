import React , {useState , useEffect, useContext} from "react"
import { DataContext } from "../../../contexts/DataContext"
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
    
    return (
        <div className="container">
            <div class="row">
                <div class="col s12 l4">
                    <div className='mainCard'>
                        Hello
                    </div>
                </div>
                <div class="col s12 l4 offset-l4">
                    <div className='mainCard'>
                        Hello
                    </div>
                </div>
                <div class="col s12">
                    
                    <MsgTable />
                </div>
            </div>
            
        </div>
    )
}

export default MainBoard
