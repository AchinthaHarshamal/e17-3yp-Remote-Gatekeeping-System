import React  , {useState , createContext}from 'react'
import {db , storage} from '../config/fbConfig';

export const InitContext = createContext();


const InitContextProvider =(props)=>{
    const [node, setNode] = useState(null)
    const [serialNumber, setSerialNumber] = useState(String(localStorage.getItem('serialNumber')))
    

    const getNode =(serialNumber) =>{
        const dbRef = db.ref();
        
        localStorage.setItem('serialNumber' , String(serialNumber))
        //setSerialNumber(serialNumber)
        return dbRef.child("nodes/"+serialNumber).get()
    }

    const nodeInit = async (userId,fname , lname ,  email , imageFile) => {
        const nodeID = db.ref().child('initNode').push().key;
        const msgID = db.ref().child('messages/'+nodeID).push().key;
        const imageRef = storage.ref().child('users/'+userId+'/'+imageFile.name)
        
       let imgUrl = null;
       try {
           const imageFileSnapShot = await imageRef.put(imageFile)
           imgUrl = await imageFileSnapShot.ref.getDownloadURL()
       }catch(err){
           throw err
       }
       
       
        const userDate = {
            
            'admin' : true ,
            'email' : email,
            
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
        setData['/nodes/'+serialNumber+'/nodeId'] = nodeID
        setData['/users/'+userId] = userDate
        setData['/initNodes/'+nodeID] = nodeData
        setData['/messages/'+nodeID+'/'+msgID] = botMessage
       
        return  db.ref().update(setData);
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