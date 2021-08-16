
export const downloadMsg = (id) => {
    return (dispatch, getState ,{getFirebase , getFirestore}) =>{
        // make async call to datase
        let d = new Date() ;
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;

        firestore.collection('messages').add({
            from: profile.firstName,
            to: profile.lastName,
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