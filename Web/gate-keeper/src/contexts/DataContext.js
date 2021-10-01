import React  , {useRef, useState , createContext,useEffect}from 'react'
import {db } from '../config/fbConfig';
import { auth } from '../config/fbConfig';


export const DataContext = createContext();

const DataContextProvider = (props) => {
  
    const [messages, setMessages] = useState({})
    const [userInfo, setUserInfo] = useState({}) 
    const userI = useRef({})


    const getUserInfo = async (userId) =>{
        const userRef = db.ref().child('users/'+userId)
        try{
            const info = await userRef.get()
            if( info.exists()){
                const values = info.val()
                setUserInfo(values)
                userI.current = values
                //console.log("oo " ,userI.current)
                return(values)
            }
        }catch(err){
                console.log('Error on authentication')
                //throw err
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
            //throw err
            console.log('Some error')
        }
    }

    const storeData = async (userId) => {
        //console.log(Object.keys(userInfo).length === 0)
        //console.log(userId)
        if(Object.keys(userInfo).length === 0 || Object.keys(messages).length===0){

            try{
                const info = await getUserInfo(userId)
                //console.log('ii :' , info)
                await getMessages(info.nodeId)
                //console.log(messages)
            }catch(err){
                console.log(err.message)
            }
            

        }
    }

    useEffect(  () => {
        auth.onAuthStateChanged( user => {
            if(user){
                //console.log('user id from data' , user.uid)
                storeData(user.uid)
                
            }
           
        })
    })
    const values = {
       
        getMessages,
        getUserInfo,
        storeData,
        userInfo,
        messages,
        userI
    }


    return (
        <DataContext.Provider value = {values}>
              {props.children}
        </DataContext.Provider>
    )
       
}

export default DataContextProvider
