import React , {useEffect} from 'react'
import { NavLink } from 'react-router-dom';
import M from 'materialize-css'


const  SideNavbar = () => {
    useEffect(() => {
        const elems = document.querySelectorAll('.sidenav');
        M.Sidenav.init(elems,{});
    })

    return (
        <div>
            <ul id="signedInNav" className="sidenav   z-depth-0 grey darken-2">
                <li ><NavLink to='signin'><i className="material-icons white-text">login</i>Sign In</NavLink></li>
                <li><NavLink to='authNode'><i className="material-icons  white-text">cable</i>Connect Device</NavLink></li>
                <li><a href="#!"><i className="material-icons  white-text">get_app</i>Download app</a></li>
                <li><a href="#!"><i className="material-icons  white-text">contact_support</i>FAQ</a></li>
                <li><a href="#!"><i className="material-icons  white-text">shopping_cart</i>Order Now!</a></li>
            </ul>
           

            </div>
    )
}

export default SideNavbar
