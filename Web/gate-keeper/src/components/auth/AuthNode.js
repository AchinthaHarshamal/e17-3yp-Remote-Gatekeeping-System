import React, { useState , useContext} from 'react'
import {Redirect} from 'react-router-dom'
import { DataContext } from '../../contexts/DataContext';



const  AuthNode = () => {

    
    const [serialNumber, setSerialNumber] = useState();
    const {getNode,nodeSet , node} = useContext(DataContext);
    const [errorMsg, setErrorMsg] = useState(null)

    const handleChange = (e) => {
        setSerialNumber(e.target.value)
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        if(serialNumber ==''){
            setErrorMsg("Serial Number is Required!")
            return
        } 
        try{
            const node = await getNode(serialNumber);
            //console.log("node " ,node.exists())
            if(node.exists()  &&  !node.val().init ){
               
                setErrorMsg('')
                nodeSet({node , serialNumber})

                //console.log("Node init state: ",node.val().init)
                //console.log("Seri : ",serialNumber)

            }else{
                nodeSet({})
                
                setErrorMsg('Wrong Serial number Or Device Is Already Initialized')
                console.log("Wrong Serial number Or Device Is Already Initialized")
            }
            
        }catch(err){
            setErrorMsg(err.message)
            console.log(err.message)
        }
        
    }

    if(node) return <Redirect to='/signup'/>
    return (
        <div className="container">
            <form onSubmit={handleSubmit} className="white">
                <h5 className="grey-text text-darken-3">Connect Your Device</h5>

                <div className="input-field">
                    <label htmlFor="nodeId">Serial Number</label>
                    <input type="text" id="nodeId" onChange={handleChange}/>
                </div>

                <div className="input-field">
                    <button className="btn blue lighten-1 z-depth-0">Next</button>
                    <div className="red-text center">
                        {errorMsg ? <p>{errorMsg} Please Try Again! </p>  :null } 
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AuthNode





