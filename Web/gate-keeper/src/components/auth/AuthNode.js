import React, { useState , useContext} from 'react'
import {Redirect} from 'react-router-dom'
import { DataContext } from '../../contexts/DataContext';
import firebase from 'firebase';


/*
        const {nodeAvilable,nodeError} = this.props.node
        //console.log('avilable : ' ,nodeAvilable , nodeError) 

        if(nodeAvilable) return <Redirect to='/signup'/>
        */

const  AuthNode = () => {

    
    const [serialNumber, setSerialNumber] = useState('');
    const {getNode} = useContext(DataContext);
    const handleChange = (e) => {
        setSerialNumber(e.target.value)
    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            const node = await getNode(serialNumber);
            console.log("Node success : ",node.val())
        }catch(err){
            console.log("some error")
        }
        

       
        // const dbRef = firebase.database().ref();
        // dbRef.child("nodes/testId").get().then((snapshot) => {
        //   if (snapshot.exists()) {
        //     console.log(snapshot.val());
        //   } else {
        //     console.log("No data available");
        //   }
        // }).catch((error) => {
        //   console.error(error);
        // });
    }


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
                        {/* {nodeError ? <p>{nodeError} Please Check Again! </p>  :null }   */}
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AuthNode





