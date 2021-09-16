import React , {Component} from "react";
import {BrowserRouter ,Switch, Route} from 'react-router-dom';

import Navbar from "./components/layout/Navbar";
import SignedUp from "./components/auth/SignedUp";
import SignedIn from "./components/auth/SignedIn";
import Dashbord  from "./components/dashbord/Dashbord";
import AuthNode from "./components/auth/AuthNode";
import Insert from "./components/dashbord/Insert";
import Home from "./components/home/Home";

import AuthContextProvider from "./contexts/AuthContext";
import DataContextProvider from "./contexts/DataContext";
import InitContextProvider from "./contexts/InitContext";


function App() {
  return (
    <BrowserRouter>
     <AuthContextProvider>
      <DataContextProvider>
        <InitContextProvider>
        <Navbar/>
        <Switch>
            <Route exact path='/' component={Home}></Route>
            <Route path='/signin' component={SignedIn}></Route>
            <Route path='/signup' component={SignedUp}></Route>
            <Route path='/authnode' component={AuthNode}></Route>
            <Route path='/dashboard' component={Dashbord}></Route>
            <Route pat='/insert' component={Insert}></Route>
            {/* <Home /> */}
        </Switch>
        </InitContextProvider>
      </DataContextProvider>
     </AuthContextProvider>
      
    </BrowserRouter>
    
  );
}

export default App;
