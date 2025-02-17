import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BrowsePage from './components/BrowsePage';
import Profile from './components/Profile';
import CreateBlog from './components/CreateBlog';
import Login from './authcomponents/Login'
// Lazy load authentication components
const SignUp = lazy(() => import('./authcomponents/SignUp'));
const LoadingFallback = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh' 
  }}>
    Loading...
  </div>
);


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
