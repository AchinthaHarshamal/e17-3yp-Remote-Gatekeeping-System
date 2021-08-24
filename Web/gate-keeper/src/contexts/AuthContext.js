import React  , {createContext , useState , useEffect}from 'react'
import { auth  ,db} from '../config/fbConfig';


export const AuthContext = createContext();

const AuthContextProvider = (props) => {
    const [user,setUser] = useState();
    const [userId, setUserId] = useState(null)
    const [loading, setLoading] = useState(true);

    const signup = ({email, password}) => {
        return auth.createUserWithEmailAndPassword(email, password);
    }

    const signin = ({email , password}) => {
        //console.log("Email : " ,email ,"password", password)
        return auth.signInWithEmailAndPassword(email , password);
    }

    const signout = () => {
       
        return auth.signOut();
    }

    const value = {
        user , 
        userId,
        signup,
        signin,
        signout
    }

    useEffect(() => {
        const userState  = auth.onAuthStateChanged( user => {
            //console.log("User : " ,user)
            setUser(user)
            
            user ? setUserId(user.id) : setUserId(null)
            setLoading(false)
        })
    })



    return (
      <AuthContext.Provider value = {value}>
          {!loading  && props.children}
      </AuthContext.Provider>
    )
}

export default AuthContextProvider
