import React from "react"


export const NodeStatus = () => {
    if (true) {
        return(
            <div className='mainCard  pink darken-4 z-depth-3'>
                <a href="#device-on" className="white-text">
                    <i className="material-icons z-depth-1">power</i>
                    <span>Power</span>
                    <h5 className='z-depth-1'>ON</h5>
                </a>
            </div>
        )
    }else{
        return (
            <div className='mainCard grey darken-2'>
                <a href="#device-off" className="white-text">
                    <i className="material-icons z-depth-1">power_off</i>
                    <span>Power</span>
                    <h5 className='z-depth-1'>OFF</h5>
                </a>
            </div>
        )
    }
}

export default NodeStatus