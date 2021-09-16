import React  , {useContext , useState , createContext,useEffect}from 'react'
import {db } from '../config/fbConfig';
import { AuthContext } from './AuthContext';

export const DataContext = createContext();

const DataContextProvider = (props) => {
  
    const [messages, setMessages] = useState({})
    const [userInfo, setUserInfo] = useState({}) 
    const {user} = useContext(AuthContext) 


    const getUserInfo = async (userId) =>{
        const userRef = db.ref().child('users/QlM4lUrjswcTMCoZccdtKzR1eJk1')
        try{
            const info = await userRef.get()
            if( info.exists()){
                const values = info.val()
                setUserInfo(values)
                //console.log("oo " ,values)
                return(values)
            }
        }catch(err){
                console.log('Error on authentication')
                throw err
        }
    }
    const getMessages = async (nodeId) => {
        
        const msgRef = db.ref().child('messages/'+nodeId)

        try{
            const msgsObj = await msgRef.get()
            //console.log('msg exist' , msgsObj.exists())
            if(msgsObj.exists()){
                const msgs = msgsObj.val()
                setMessages(msgs)
                //console.log('msgs :' , messages)
                return msgs
                
            }
        }catch(err){
            throw err
            //console.log('Some error')
        }
    }

    
    const values = {
       
        getMessages,
        getUserInfo,
        userInfo
    }


    return (
        <DataContext.Provider value = {values}>
              {props.children}
        </DataContext.Provider>
    )
       
}

export default DataContextProvider
