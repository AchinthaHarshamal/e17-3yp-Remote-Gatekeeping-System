import React  , {createContext , useState , useEffect}from 'react'
import {db} from '../config/fbConfig';


export const DataContext = createContext();

const DataContextProvider = (props) => {

    const [node, setNode] = useState(null)
    const [serialNumber, setSerialNumber] = useState(null)

    
    const getNode =(serialNumber) =>{
        const dbRef = db.ref();

        return dbRef.child("nodes/"+serialNumber).get()
        
    }

    const nodeSet = ({node , serialNumber} ) => {
        console.log("serial numbere : " , serialNumber)
        setNode(node)
        setSerialNumber(serialNumber)
    }
   
    const values = {
        node , 
        serialNumber ,
        getNode,
        nodeSet
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
