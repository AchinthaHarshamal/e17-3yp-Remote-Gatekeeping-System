import React from 'react'

const  Hlist  = ({messages}) =>  {

    const cards = messages.map( (msg) =>{
            return (
                <div class="col s12 l3">
                    <div class="card z-depth-0 deep-purple lighten-2zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz">
                        <div class="card-content white-text ">  
                            <span class="card-title">{msg.dataType}</span>
                            <p>From : {msg.from}</p>
                            <p>To: {msg.to} </p>
                            <p>Date : {msg.time}</p>
                        </div>
                    </div>
                </div>
            )})
    
   
    return (
        <div className ="row">
            {cards}
        </div>
    )
}

export default Hlist
