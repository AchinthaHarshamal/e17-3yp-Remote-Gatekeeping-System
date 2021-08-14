import { firestoreReducer } from "react-redux-firebase";


export const nodeInit = (id) => {
    return (dispatch , getState , {getFirestore}) =>{
        const firestor = getFirestore();

        firestor.collection('nodes').doc(id.nodeId).get().then((resp)=>{
            //console.log("dats " ,resp.data())
            if (!resp.exists) {
                console.log('No such document!');
                dispatch({type : 'INIT_NODE_FAILE'});
            }
            else {
                console.log('Document data:', resp.data());
                dispatch({type : 'INIT_NODE'});
            }
           
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

        firebase.auth().createUserWithEmailAndPassword(
            newUser.email, 
            newUser.password
        ).then((resp) => {
            return firestore.collection('users').doc(resp.user.uid).set({
                firstName : newUser.firstName,
                lastName : newUser.lastName,
                initials : newUser.firstName[0]+newUser.lastName[0],
                productId : newUser.productId
            }).then(() => {
                dispatch({type:'SIGNUP_SUCCESS'})
            }).catch((err) => {
                dispatch({type : 'SIGNUP_ERROR' ,err})
            })
        })
    }
}