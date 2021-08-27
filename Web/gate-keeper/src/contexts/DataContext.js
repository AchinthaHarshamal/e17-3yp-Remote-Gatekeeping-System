import React  , {useContext , useState , createContext,useEffect}from 'react'
import {db} from '../config/fbConfig';
import { AuthContext } from './AuthContext';


export const DataContext = createContext();

const DataContextProvider = (props) => {

    const [node, setNode] = useState(null)
    const [serialNumber, setSerialNumber] = useState(null)

    
    const getNode =(serialNumber) =>{
        const dbRef = db.ref();
        return dbRef.child("nodes/"+serialNumber).get()
    }

    const nodeInit = (userId,fname , lname , imgUrl) => {
        const nodeID = db.ref().child('initNode').push().key;
        console.log('node ID : ' , nodeID)
        const userDate = {
            'admin' : true ,
            'email' : 'some@email.com',
            fname, 
            lname,
            imgUrl,
            nodeID 

        }
        const nodeData = {
            'adminID' : userId,
            'users' : {
                'user_0' : userId,
                'user_1' : ''
            }
        }
        const setData = {};
        setData['/users/'+userId] = userDate
        setData['/initNodes/'+nodeID] = nodeData
        setData['/messages/'+nodeID] = ''
        console.log('user id : ', userId)
        return db.ref().update(setData);
    }

    const nodeSet = ({node , serialNumber} ) => {
        //console.log("serial numbere : " , serialNumber)
        //console.log('Node : ' , node)
        setNode(node)
        setSerialNumber(serialNumber)
    }
   
    const values = {
        node , 
        serialNumber ,
        getNode,
        nodeSet,
        nodeInit
    }

    // useEffect(() => {
    //     if(node){
            
    //     }
        
    // }, [node])

    return (
        <DataContext.Provider value = {values}>
              {props.children}
        </DataContext.Provider>
    )
       
}

export default DataContextProvider
