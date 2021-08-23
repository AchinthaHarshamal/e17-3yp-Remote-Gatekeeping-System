import React  , {createContext , useState , useEffect}from 'react'
import {db} from '../config/fbConfig';


export const DataContext = createContext();

const DataContextProvider = (props) => {

    const [dbRef, setDbRef] = useState(db.ref())
    
    const getNode =(serialNumber) =>{
        const dbRef = db.ref();
        return dbRef.child("nodes/"+serialNumber).get()
        
    }
   
    const values = {
        dbRef,
        getNode
    }

    return (
        <DataContext.Provider value = {values}>
              {props.children}
        </DataContext.Provider>
    )
       
}

export default DataContextProvider
