import React  , {useContext , useState , createContext,useEffect}from 'react'
import {db } from '../config/fbConfig';


export const InitContext = createContext();


const InitContextProvider =(props)=>{
    const [node, setNode] = useState(null)
    const [serialNumber, setSerialNumber] = useState(null)

    const getNode =(serialNumber) =>{
        const dbRef = db.ref();
        return dbRef.child("nodes/"+serialNumber).get()
    }

    const nodeInit = (userId,fname , lname , imgUrl) => {
        const nodeID = db.ref().child('initNode').push().key;
        const msgID = db.ref().child('messages/'+nodeID).push().key;
        //console.log('node ID : ' , nodeID)
        
        const userDate = {
            'admin' : true ,
            'email' : 'some@email.com',
            'fName' :fname, 
            'lName' :lname,
            'imgUrl' :imgUrl,
            'nodeId' :nodeID 

        }

        const nodeData = {
            'adminID' : userId,
            'users' : {
                'user_0' : userId,
                'user_1' : ''
            }
        }

        const currentdate = new Date();

        //console.log(currentdate.toDateString())
        const botMessage = {
                'event' : '0',
                'from' : 'Bot' ,
                'to' : 'All',
                'msgUrl' : 'testUrl',
                'msgType' : 'text',
                'time': currentdate.toJSON()
            
        }

        const setData = {};
        setData['/users/'+userId] = userDate
        setData['/initNodes/'+nodeID] = nodeData
        setData['/messages/'+nodeID+'/'+msgID] = botMessage
        //console.log('user id : ', userId)
        return db.ref().update(setData);
    }

    const values = {
        node , 
        serialNumber,
        getNode,
        nodeInit,
        setNode,
        setSerialNumber,
    }

    return (
        <InitContext.Provider value = {values}>
              {props.children}
        </InitContext.Provider>
    )

}


export default InitContextProvider