
export const downloadMsg = (id) => {
    return (dispatch, getState,{getFirebase , getFirestore}) =>{
        // make async call to datase
        let d = new Date() ;
        const firestore = getFirestore();
        firestore.collection('messages').add({
            from: 'Node 1',
            to: 'device 1',
            time: d,
            dataType:'Test',
            id : Math.floor(Math.random() *10000)

        }).then(() => {
            dispatch({type :'DOWNLOAD_MESSAGE' , id});
        }).catch((err)=>{
            console.log('Error' , err);
        })
        
       
    }
}