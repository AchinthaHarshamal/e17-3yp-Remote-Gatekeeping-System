import React , {useContext} from 'react'
import { Redirect } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import { Link } from 'react-router-dom'



const  HomePage = () => {

    const {user} = useContext(AuthContext)

    if(user != null) { return <Redirect to='/dashboard'/> }
 
    return (
        <div >
            <div className="home grey darken-3">
                <div className='heroText '>
                    <h2 className="grey-text ">Secure Your Delevery, Child & Home</h2>
                    <p>
                    
                        <b> When you are not being at home, and delevery come to the door. </b>
                         What will happen to the delevery.<br/><br/>
                        <b> In this pandamic situation, Interact with your outsiders specialy taking a delevery. 
                            </b> Is that okay<br/><br/>
                        
                        <b> When your are not at home is it safe to interact your child with your out siders </b>

                    </p>
                    <h5>We weill give your the best soution</h5>

                    <div className='heroButtons z-depth-5'>
                        <span >
                            Contact 
                            <Link to='/contactus' className="btn-floating cyan accent-4 pulse">
                                <i className="material-icons">contact_page</i>
                            </Link>
                        </span>
                        <span >
                            Download App
                            <Link to='/download' className="btn-floating  light-blue darken-4 pulse">
                                <i className="material-icons">get_app</i>
                            </Link>
                        </span>
                    
                    </div>
                </div>
                
            </div>
        </div>
        
    )
}

export default HomePage