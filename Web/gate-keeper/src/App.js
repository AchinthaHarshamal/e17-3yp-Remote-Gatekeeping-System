import React , {Component} from "react";
import Navbar from "./components/layout/Navbar";
import {BrowserRouter ,Switch, Route} from 'react-router-dom';
import Home from "./components/home/Home";

function App() {
  return (

    <BrowserRouter>
      <Navbar/>
      <Switch>
         <Route path='/' component={Home}></Route>
         <Home />
      </Switch>
      
    </BrowserRouter>
    
  );
}

export default App;
