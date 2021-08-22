import React  , {createContext , useState , useEffect}from 'react'
import {db} from '../config/fbConfig';


export const DataContext = createContext();

const DataContextProvider = (props) => {

    const [dbRef, setDbRef] = useState(db.ref())
    

   


    const values = {
        dbRef
    }

    return (
        <DataContext.Provider value = {values}>
              {props.children}
        </DataContext.Provider>
    )
       
}

export default DataContextProvider
