import React  , { useState , createContext,useEffect}from 'react'
import {db } from '../config/fbConfig';
import { auth } from '../config/fbConfig';


export const DataContext = createContext();

const DataContextProvider = (props) => {
  
    const [messages, setMessages] = useState({})
    const [userInfo, setUserInfo] = useState({}) 
    const [dataLoaded, setDataLoaded] = useState(Boolean(localStorage.getItem('dataLoaded')))


    const getUserInfo = async (userId) =>{
        const userRef = db.ref().child('users/'+userId)

        try{
            const info = await userRef.get()
            if( info.exists()){
                const values = info.val()
                setUserInfo(values)
                return(values)
            }
        }catch(err){
                console.error('Error on authentication')
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
            console.log(err.message)
            throw err
            
        }
    }

    const storeData = async (userId) => {
        if(Object.keys(userInfo).length === 0 || Object.keys(messages).length===0){
            try{
                const info = await getUserInfo(userId)
                await getMessages(info.nodeId)
            }catch(err){
                
                console.log(err.message)

            }
        }
    }

    useEffect(  () => {
        dataLoaded && auth.onAuthStateChanged( user => {
            if(user){
                storeData(user.uid) 
            }else{
                setDataLoaded(false)
                setUserInfo({})
                setMessages({})
            }
           
        })
        localStorage.setItem('dataLoaded' , Boolean(dataLoaded))
    })

    const values = {
       
        getMessages,
        getUserInfo,
        storeData,
        setDataLoaded,
        userInfo,
        messages,
        dataLoaded
    }


    return (
        <DataContext.Provider value = {values}>
              {props.children}
        </DataContext.Provider>
    )
       
}

export default DataContextProvider
