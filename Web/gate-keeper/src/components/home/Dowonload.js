import React from 'react'
import downloadImage from '../../img/download.jpg'

const  Dowonload = () => {
    return (
        <div className="section">
            <div class="card  z-depth-3 deep-purple darken-4">
                <div className="card-image">
                    <img src={downloadImage} alt="sah hello" />
                    
                    <a class="btn-floating halfway-fab waves-effect waves-light deep-purple accent-2"><i class="material-icons">download</i></a>
                </div>
                <div class="card-content white-text ">  
                    <span className="card-title">Download the app</span>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, 
                        iusto. Vel suscipit in molestias quis officiis a sed odit tenetur perferendis.
                        Necessitatibus saepe illum itaque quisquam ab aut quas impedit.

                    </p>
                </div>
            </div>
        </div>
        
    )
}

export default Dowonload

