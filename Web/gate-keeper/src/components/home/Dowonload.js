import React from 'react'
// import downloadImage from '../../img/download.jpg'

const  Dowonload = () => {

    const downloadApp = ()=> {
        console.log('hello')
    }
    return (
        <div className='download'>
            <div className='container indigo accent-1'>    
                <div className="row">
                    <div className="col l6 s12">
                        <h3 className="white-text">Take your App</h3>
                        <p className="white-text text-lighten-4">
                        We are proud to offer the one and only <b>Smart GateKeeper </b>, trusted. 
                        
                        <br/>
      
                         Step 1: Download the our app and install it in device.<br/>
                         Step 2: Use email and password to loging to the app.
                             
                        <br/><b>Enjoy your security!</b>
                    
                        </p>
                        
                    </div>
                    <div className="col l4 offset-l2 s12   grey  accent-2">
                        <ul>
                            <li> 
                                <a href="/download" className="waves-effect waves-light">
                                    <span className='white-text'>Download Here</span>
                                </a>
                                <div onClick={downloadApp} className="btn-floating light-blue pulse ">
                                   <i className="material-icons">download</i>
                                 </div>
                            </li>
                            
                        </ul> 
                    </div>

                    
                </div>
            </div>
        </div>
        
    )
}

export default Dowonload

