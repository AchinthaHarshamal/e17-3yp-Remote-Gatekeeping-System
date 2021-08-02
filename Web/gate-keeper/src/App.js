import React , {Component} from "react";
import Navbar from "./components/layout/Navbar";
import {BrowserRouter ,Switch, Route} from 'react-router-dom';
import Home from "./components/home/Home";
import SignedUp from "./components/auth/SignedUp";
import SignedIn from "./components/auth/SignedIn";
import Dashbord  from "./components/dashbord/Dashbord";

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Switch>
         <Route exact path='/' component={Home}></Route>
         <Route path='/signin' component={SignedIn}></Route>
         <Route path='/signup' component={SignedUp}></Route>
         <Route path='/dashboard' component={Dashbord}></Route>

         <Home />
      </Switch>
    </BrowserRouter>
    
  );
}

export default App;
