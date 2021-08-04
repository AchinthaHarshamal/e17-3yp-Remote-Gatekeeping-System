import React from 'react'

const  Hlist  = ({messages}) =>  {
   
    return (
        <div>
             <h1>Hello how are your</h1>
            { messages.map( (msg) => {
                return (
                    <h5 key={msg.id}>from : {msg.from} to : {msg.to} type : {msg.dataType}</h5>
                )
            })}
        </div>
    )
}

export default Hlist
