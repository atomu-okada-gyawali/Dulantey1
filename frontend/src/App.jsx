import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BrowsePage from './components/BrowsePage';
import Profile from './components/Profile';
import CreateBlog from './components/CreateBlog';
import Login from './authcomponents/Login';
import SignUp from './authcomponents/SignUp';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BrowsePage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/createBlog" element={<CreateBlog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />


      </Routes>
    </Router>
  );
}

export default App;
