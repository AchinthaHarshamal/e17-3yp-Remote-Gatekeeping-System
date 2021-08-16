import { firestoreReducer } from "react-redux-firebase";


export const nodeInit = (node) => {
    return (dispatch , getState , {getFirestore}) =>{
        const firestor = getFirestore();

        firestor.collection('nodes').doc(node.nodeId).get()
        .then((resp)=>{
            //console.log("dats " ,resp.data())
            if (resp.exists && !(resp.data().initialized)) {
                console.log('Document data:', resp.data());
                dispatch({type : 'INIT_NODE',nodeId: node.nodeId});
            }
            else {
                console.log('No such document!');
                dispatch({type : 'INIT_NODE_FAILE'});
            }
           
        }).catch((err)=>{
                dispatch({type : 'INIT_NODE_ERROR',err})
        })   
    }
}

export const signIn =(credentials) => {
    return(dispatch , getState ,{getFirebase}) => {
        const firebase = getFirebase();

        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(()=> {
            dispatch({type : 'LOGIN_SUCCESS'})
        }).catch((err) => {
            dispatch({type : 'LOGIN_ERROR' , err})
        })
    }
}


export const signOut = () =>{
    return(dispatch , getState , {getFirebase}) => {
        const firebase = getFirebase();
        firebase.auth().signOut().then((resp) => {
            
            console.log('res' ,resp)
            dispatch({type : 'SIGNOUT_SUCCESS'})
        })
    }
}

export const signUp = ( newUser ) => {
    return (dispatch , getState , {getFirebase , getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        let d = new Date() ;
        firebase.auth().createUserWithEmailAndPassword(
            newUser.email, 
            newUser.password
        ).then((resp) => {
            return firestore.collection('users').doc(resp.user.uid).collection('userInfo').doc().set({
                firstName : newUser.firstName,
                lastName : newUser.lastName,
                initials : newUser.firstName[0]+newUser.lastName[0],
                productId : newUser.productId
            }).then(() => {
                firestore.collection('users').doc(resp.user.uid).collection('messages').doc().set({
                    from: 'Robot',
                    to: 'All',
                    time: firestore.FieldValue.serverTimestamp() ,
                    dataType:'test',
                    UID : 'Robot 0'
                }).then(()=>{
                    firestore.collection('nodes').doc(newUser.productId).set({
                        initialized : true,
                        nodeId: resp.user.uid // Id generate while making the 
                    }).then(()=>{
                        dispatch({type:'SIGNUP_SUCCESS'})
                    })
                })
                
            }).catch((err) => {
                dispatch({type : 'SIGNUP_ERROR' ,err})
            })
        })
    }
}