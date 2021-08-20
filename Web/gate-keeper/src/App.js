import React , {Component} from "react";
import Navbar from "./components/layout/Navbar";
import {BrowserRouter ,Switch, Route} from 'react-router-dom';
import Home from "./components/home/Home";
import SignedUp from "./components/auth/SignedUp";
import SignedIn from "./components/auth/SignedIn";
import Dashbord  from "./components/dashbord/Dashbord";
import AuthNode from "./components/auth/AuthNode";

import AuthContextProvider from "./contexts/AuthContext";
function App() {
  return (
    <BrowserRouter>
     <AuthContextProvider>

      <Navbar/>
      <Switch>
          <Route exact path='/' component={Home}></Route>
          <Route path='/signin' component={SignedIn}></Route>
          <Route path='/signup' component={SignedUp}></Route>
          <Route path='/authnode' component={AuthNode}></Route>
          <Route path='/dashboard' component={Dashbord}></Route>
          {/* <Home /> */}
      </Switch>

     </AuthContextProvider>
      
    </BrowserRouter>
    
  );
}

export default App;
