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
            <ul id="signedInNav" className="sidenav   z-depth-0  indigo lighten-2 font1">
                <li ><NavLink to='signin'><i id='side-signin' className="material-icons white-text">login</i>Sign In</NavLink></li>
                <li><NavLink to='authNode'><i id='side-init' className="material-icons  white-text">cable</i>Connect Device</NavLink></li>
                <li><a href="#!"><i id='side-download' className="material-icons  white-text">get_app</i>Download app</a></li>
                <li><NavLink to='faq'><i id='side-faq' className="material-icons  white-text">contact_support</i>FAQ</NavLink></li>
                <li><a href="#!"><i id='side-cart' className="material-icons  white-text">shopping_cart</i>Order Now!</a></li>
            </ul>
           

            </div>
    )
}

export default SideNavbar
