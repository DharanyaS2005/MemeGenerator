import React from "react";
import { useState } from "react"; 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./components/FunctionalComponent/Landing";
import Login from "./components/FunctionalComponent/Login";
import Signup from "./components/FunctionalComponent/Signup";
import Home from "./components/FunctionalComponent/Home";
import MyCollection from "./components/FunctionalComponent/MyCollection";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />}/>
        <Route path="/signup" element={<Signup />} />
        <Route path="/mycol" element={<MyCollection/>}/>
      </Routes>
    </Router>
  );
}

export default App;
