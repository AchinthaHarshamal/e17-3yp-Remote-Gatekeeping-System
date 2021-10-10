import React ,{ useContext, useEffect} from 'react'
import { AuthContext } from '../../contexts/AuthContext';
import M from 'materialize-css'


const SignedInLinks = ()=> {
    
    const {signout} = useContext(AuthContext)
    useEffect(()=>{
        var elems = document.querySelectorAll('.tooltipped');
        M.Tooltip.init(elems, {})
    })

    
    return (
        <ul className="right">
            {/* <li><NavLink to="/dashboard">Dashboard</NavLink></li> */}
            <li><span  onClick={signout} ><i id = "nav-signout" className="material-icons  white-text tooltipped" data-position="bottom" data-tooltip="Sign Out">logout</i></span></li>
            {/* <li><NavLink to="/" className="btn btn-floating yello darken-5">AB</NavLink></li> */}
        </ul>

    )
}



export default SignedInLinks
