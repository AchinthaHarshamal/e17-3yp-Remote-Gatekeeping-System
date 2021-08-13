import React, { Component } from 'react'

class AuthNode extends Component {

    state={
        nodeId: ''
    }


    handleChange = (e) => {
        console.log(e.target.value);
        this.setState({
            [e.target.id]:e.target.value
        })
    }
    handleSubmit =(e)=>{
        
        e.preventDefault();
        //this.props.signIn(this.state)
        console.log(this.state);
    }

    render() {
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="grey-text text-darken-3">Node Init</h5>

                    <div className="input-field">
                        <label htmlFor="nodeId">Node ID</label>
                        <input type="text" id="nodeId" onChange={this.handleChange}/>
                    </div>

                    <div className="input-field">
                        <button className="btn blue lighten-1 z-depth-0">Inititialize</button>
                        <div className="red-text center">
                            {/* {authError ? <p> {authError} </p> : null} */}
                        </div>
                    </div>
                </form>

            </div>
        )
    }
}

export default AuthNode
