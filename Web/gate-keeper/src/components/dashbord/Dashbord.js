import React, { Component } from 'react';
import {connect} from 'react-redux';
import Hlist from './Hlist';
class Dashbord extends Component {

    render() {
        //console.log(this.props)
        const {messages} = this.props;
        //console.log(messages)
        return (
            <div className="container">
                <h1>Hello Dashboard</h1> 
                <Hlist messages={messages}/>

            </div>
        )
    }
}

const mapStateToProps =(state) => {
    return {
        messages: state.dboard.messages
    }
}

export default connect(mapStateToProps)(Dashbord);

