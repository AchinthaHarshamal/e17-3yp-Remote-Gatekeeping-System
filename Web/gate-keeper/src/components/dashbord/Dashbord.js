import React, { Component } from 'react';
import Messages from './Messages';
import { Redirect } from 'react-router-dom'


class Dashbord extends Component {

    // loadComponent = (authId) =>{
    //     if(isLoaded(authId)){
    //         return(
    //             <div>
    //                 <h3>Hello User</h3> 
    //                 <h5>History of conversation</h5>
    //                  <Messages  authId = {authId}/>
    //             </div>
    //         )
    //     }
    //     else (
    //             <div>
    //                 <h1>Loading...</h1> 
    //             </div>
    //     )
    // }

    render() {
       
        /*
        const {auth} = this.props;
        //console.log(messages)

        if(!auth.uid) return <Redirect to='/'/>
        */
        return (
            <div className="container">
                {/* {this.loadComponent(auth.uid)} */}
            </div>
        ) 
    }
}


export default Dashbord;

