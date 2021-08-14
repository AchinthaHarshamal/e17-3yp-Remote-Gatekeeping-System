const initState = {
    nodeId: '',
    nodeAvilable : false ,
    nodeError:''
}
const authReducer = (state = initState , action) =>{

    switch(action.type){
        case 'INIT_NODE':
            console.log('Successfully Initialize the node')
            return {
                ...state,
                nodeId: action.nodeId,
                nodeAvilable :true,
                nodeError:""            
            }
        case 'INIT_NODE_FAILE':
            console.log('Faile to initialize the node')
            return {
                ...state,
                nodeAvilable :false,
                nodeError:"Node is already initialized or Node ID is wrog"
            }
        case 'INIT_NODE_ERROR':
            console.log('Some error has occured')
            return {
                ...state,
                nodeError: action.err.message
            }
            
        case 'LOGIN_ERROR':
            console.log('Login error')
            return {
                ...state,
                authError : 'Login failed'
            }
        case 'LOGIN_SUCCESS':
            console.log('Login success')
            return {
                ...state,
                authError : null
            }
        case 'SIGNOUT_SUCCESS':
            console.log('Signout success')
            return {
                ...state,
                nodeAvilable :false
            }
        case 'SIGNUP_SUCCES':
            console.log('Signup success')
            return {
                ...state,
                authError: null
            }
        case 'SIGNUP_ERROR':
            console.log('Signup error')
            return {
                ...state , 
                authError : action.err.message
            }
        default:
            return state;
    }
   
}


export default authReducer;