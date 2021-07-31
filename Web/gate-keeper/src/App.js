import Navbar from "./components/layout/Navbar";
import {BrowserRouter} from 'react-router-dom';
import Home from "./components/home/Home";

function App() {
  return (

    <BrowserRouter>
      <Navbar/>
      <Home />
    </BrowserRouter>
    
  );
}

export default App;
