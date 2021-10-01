import React from "react"


export const NodeStatus = () => {
    if (true) {
        return(
            <div className='mainCard grey darken-2'>
                <a href="#" className="white-text">
                    <i className="material-icons">power</i>
                    <span>Power : On</span>
                </a>
            </div>
        )
    }else{
        return (
            <div className='mainCard grey darken-2'>
                <a href="#" className="white-text">
                    <i className="material-icons ">power_off</i>
                    <span>Power : Off</span>
                </a>
            </div>
        )
    }
}

export default NodeStatus