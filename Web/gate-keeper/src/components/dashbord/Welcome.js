import React , {useState , useContext} from "react"
import { Redirect } from "react-router";
import { DataContext } from "../../contexts/DataContext";
const Welcome = () => {

    const [direct, setDirect] = useState(false)
    const {storeData} = useContext(DataContext)
    const handleSubmit = async (e)=>{
        
        e.preventDefault();

        console.log('redirect')
        // storeData()
        setDirect(true)
        
        
    }

    if(direct){
        setDirect(false)
        return <Redirect to='/'/>

    }

    return (  
        <div className="container">
            <form onSubmit={handleSubmit} className="white">
                <h5 className="grey-text text-darken-3">Welcome</h5>
                

                <div className="input-field">
                    <button className="btn grey darken-2 z-depth-0">Sign In</button>
                    <div className="red-text center">
                              
                    {/* {errorMsg ? <p>{errorMsg}</p> : null} */}
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Welcome
