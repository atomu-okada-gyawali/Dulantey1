
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BrowsePage from './components/BrowsePage'; 
import Profile from './components/Profile'; 
import CreateBlog from './components/CreateBlog';
import Login from "./components/Login"

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/" element={<BrowsePage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/createBlog" element={<CreateBlog />} />
        </Routes>
    </Router>
  );
}

export default App;
