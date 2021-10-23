import React , {useState} from 'react'
import { storage } from '../../config/fbConfig'
// import downloadImage from '../../img/download.jpg'

const  Dowonload = () => {

    const [downloadUrl, setDownloadUrl] = useState();
    
    storage.ref().child('App/smart_gatekeeper.apk').getDownloadURL()
    .then((url)=>{
        setDownloadUrl(url)
    })


    
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
                                <span className="waves-effect waves-light">
                                    <span className='white-text'>Download Here</span>
                                </span>
                                <a href={downloadUrl} className="btn-floating light-blue pulse ">
                                   <i className="material-icons">download</i>
                                 </a>
                            </li>
                            
                        </ul> 
                    </div>

                    
                </div>
            </div>
        </div>
        
    )
}

export default Dowonload

