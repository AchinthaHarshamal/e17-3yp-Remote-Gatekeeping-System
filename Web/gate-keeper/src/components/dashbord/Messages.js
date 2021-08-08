import React from 'react'
import { connect } from 'react-redux'
import { downloadMsg } from '../../store/actions/messageAction'
import downloadImage from '../../img/download.jpg'


const  Messages  = ({messages , downloadMsg}) =>  {

    console.log("inside" ,messages)
    const cards = messages &&  messages.map( (msg) =>{
        
        return (
            <div class="col s6 l3" key = {msg.id} onClick={() => {downloadMsg(msg.id)}}>
                <div class="card horizontal z-depth-0 deep-purple lighten-2">
                    <div class="card-content white-text ">  
                        <span class="card-title" >{msg.dataType}</span>
                        <p>From : {msg.from}</p>
                        <p>To: {msg.to} </p>
                        <p>Date : {/*msg.time*/}</p>
                    </div>
                    <div className= "card-image">
                        <i class="material-icons blue-text">{ msg.dataType=== 'Image' ? 'download': 'play_arrow' }</i>
                        {/* <img src={downloadImage} alt="some img here" /> */}
                    </div>
                </div>
                
            </div>
        )
    })
    
    return (
        <div className ="row">
            {cards}
        </div>
    )
}

const mapDispatchToProps = (dispatch) =>{
    return{
        downloadMsg : (id) => dispatch(downloadMsg(id))
    }
}


export default connect(null , mapDispatchToProps)(Messages)
