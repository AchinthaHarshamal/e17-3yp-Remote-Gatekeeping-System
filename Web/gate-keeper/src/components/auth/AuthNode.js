import React, { useState , useContext} from 'react'
import {Redirect} from 'react-router-dom'

import {InitContext} from '../../contexts/InitContext';



const  AuthNode = () => {

    
    const [sNumber, setSNumber] = useState()
    const [nodeInit, setNodeInit] = useState(true)
    const [errorMsg, setErrorMsg] = useState(null)

    const {getNode, setNode ,setSerialNumber} = useContext(InitContext)
   
    const handleChange = (e) => {
        setSNumber(e.target.value)
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        if(sNumber ===''){
            setErrorMsg("Serial Number is Required!")
            return
        } 
        try{
            const node = await getNode(sNumber);

            if(node.exists()  &&  !node.val().init ){
                setSerialNumber(sNumber)
                setNodeInit(node.val().init)
                setNode(node)
                setErrorMsg('')

            }else{
               
                setErrorMsg('Wrong Serial number Or Device Is Already Initialized')
            }
            
        }catch(err){
            setErrorMsg(err.message)
            console.log(err.message)
        }
        
    }
    //console.log('node : ' ,nodeInit)
    if(nodeInit === false) return <Redirect to='/signup'/>
    
    return (
        <div className="container">
            <form onSubmit={handleSubmit} className="white">
                <h5 className="grey-text text-darken-3">Connect Your Device</h5>

                <div className="input-field">
                    <label htmlFor="nodeId">Serial Number</label>
                    <input type="text" id="nodeId" onChange={handleChange}/>
                    
                </div>

                <div className="input-field">
                    <button id = 'serial-submit'className="btn grey darken-2 z-depth-0">Next</button>
                </div>
                <div className="red-text center">
                        {errorMsg ? <p>{errorMsg} Please Try Again! </p>  :null } 
                </div>
            </form>
        </div>
    )
}

export default AuthNode





