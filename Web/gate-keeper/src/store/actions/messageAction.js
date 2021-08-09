
export const downloadMsg = (id) => {
    return (dispatch, getState,{getFirebase , getFirestore}) =>{
        // make async call to datase
        let d = new Date() ;
        const firestore = getFirestore();
        firestore.collection('messages').add({
            from: 'Node ' + Math.floor(Math.random() *5) ,
            to: 'device '+ Math.floor(Math.random() *3) ,
            time: d,
            dataType:'Test',
            UID : Math.floor(Math.random() *10000)

        }).then(() => {
            dispatch({type :'DOWNLOAD_MESSAGE' , id});
        }).catch((err)=>{
            console.log('Error' , err);
        })
        
       
    }
}