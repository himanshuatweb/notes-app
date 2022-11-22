import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";


import { useDispatch } from 'react-redux';
import { removeAuth } from './features/auth/authSlice';


import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

import Auth from './pages/Auth';
import AuthVerify from "./AuthVerify";

import "./App.css";


function App() {

  const fromLocalStorage = JSON.parse(localStorage.getItem("profile"));
  const profile = fromLocalStorage?.profile;
  console.log("in app.js ", profile)

  const dispatch = useDispatch();

 


  return (
    <Router>
    <AuthVerify />
    <Routes>
          { /* <Route path="/" element={ <Home /> } /> */ }
          <Route path="/" element={ !profile ? <Auth /> :  <Navigate to='/task' />  } />
          <Route path="/signin" element={ <Auth />  } />
          <Route path="/task" element={ <Home/> } />
          <Route path="/about" element={ <About /> } />
          <Route path="*" element={ <NotFound/>  } />
       </Routes>

       
    </Router>
  );
}

export default App;