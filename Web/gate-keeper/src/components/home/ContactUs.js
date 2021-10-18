import React from "react"


const ContactUs = () => {


    return (
        <div className='contact'>
            <div className='container indigo accent-1'>    
                <div className="row">
                    <div className="col l6 s12">
                        <h3 className="white-text">Contact us</h3>
                        <p className="white-text text-lighten-4">
                        We are proud to offer the one and only <b>Smart GateKeeper </b>, trusted. 
                        It has unmatched strength and quality, and it is built to last, so we support it with a 1-year warranty.

                        <br/>
                        <b> If you have any product-related questions or claim, please contact us.  </b>    
                        </p>
                        
                    </div>
                    <div className="col l4 offset-l2 s12 white">
                        <ul>
                            <li > 
                                <a href="mailto:gatekeeper.remote@gmail.com" className="waves-effect waves-light">
                                    <span className='black-text'>gatekeeper.remote@gmail.com</span>
                                    <i className="material-icons left black-text">email</i>

                                </a>
                            </li>
                            <li> 
                                <a href="https://wa.me/94802020202" className="waves-effect waves-light">
                                    <span className='black-text'>+94 80 2020 202</span>
                                    <i className="material-icons left black-text">call</i>

                                </a>
                            </li>
                            <li> 
                                <a href="https://goo.gl/maps/3gwe3Zux42crsvBZ6" className="waves-effect waves-light">
                                    <span className='black-text'>Faculty of Engineering UoP</span>
                                    <i className="material-icons left black-text">place</i>

                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default ContactUs
