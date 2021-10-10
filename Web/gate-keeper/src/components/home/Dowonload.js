import React from 'react'
import downloadImage from '../../img/download.jpg'

const  Dowonload = () => {
    return (
        <div className="section download">
            <div className="card  z-depth-3 grey darken-4">
                <div className="card-image">
                    <img src={downloadImage} alt="sah hello" />
                    
                    <button className="btn-floating halfway-fab waves-effect waves-light teal accent-3">
                        <i id='home-download' className="material-icons">download</i>
                    </button>
                </div>
                <div className="card-content white-text ">  
                    <span className="card-title">Download the app</span>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, 
                        iuin molestias quis olor sit amet consectetur onsec tetur amet 
                    </p>
                </div>
            </div>
        </div>
        
    )
}

export default Dowonload

