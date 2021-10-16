import React  from "react";
import {BrowserRouter ,Switch, Route} from 'react-router-dom';

import Navbar from "./components/layout/Navbar";
import SignedUp from "./components/auth/SignedUp";
import SignedIn from "./components/auth/SignedIn";
import Dashbord  from "./components/dashbord/Dashbord";
import AuthNode from "./components/auth/AuthNode";
import HomePage from "./components/home/HomePage";
import Faq from "./components/home/Faq";
import Dowonload from "./components/home/Dowonload";
import ContactUs from "./components/home/ContactUs";


import Insert from "./components/dashbord/Insert";
import UploadImg from "./components/dashbord/UploadImg";

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
            <Route exact path='/' component={HomePage}></Route>
            <Route path='/signin' component={SignedIn}></Route>
            <Route path='/signup' component={SignedUp}></Route>
            <Route path='/authnode' component={AuthNode}></Route>
            <Route path='/dashboard' component={Dashbord}></Route>
            <Route path='/insert' component={Insert}></Route>
            <Route path='/upload' component={UploadImg}></Route>
            <Route path='/faq' component={Faq}></Route>
            <Route path='/download' component={Dowonload}></Route>
            <Route path='/contactus' component={ContactUs}></Route>
        </Switch>
        </InitContextProvider>
      </DataContextProvider>
     </AuthContextProvider>
      
    </BrowserRouter>
    
  );
}

export default App;
