import React from 'react'
import Dowonload from './Dowonload'
import Banner from './Banner'


const  Home = () => {
    return (
        <div className="home">
            <div className="row">
                <div className="col  s12 m7 offset-m1">
                    <Banner />
                </div>
                <div className="col  s12 m3  ">
                    <Dowonload />
                  
                </div>
            </div>
            
        </div>
    )
}

export default Home
