
import './App.css'

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BrowsePage from './components/BrowsePage'; 
import Profile from './components/Profile'; 
import CreateBlog from './components/CreateBlog';
function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          
          <Route path="/" element={<BrowsePage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/createBlog" element={<CreateBlog />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;






