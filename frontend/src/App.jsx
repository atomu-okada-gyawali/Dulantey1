import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './authcomponents/Login';
import ProtectedRoute from './ProtectedRoute'; // Assuming ProtectedRoute is implemented

// Lazy load components
const BrowsePage = lazy(() => import('./components/BrowsePage'));
const Profile = lazy(() => import('./components/Profile'));
const CreateBlog = lazy(() => import('./components/CreateBlog'));
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
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<ProtectedRoute component={BrowsePage} />} />
          <Route path="/profile" element={<ProtectedRoute component={Profile} />} />
          <Route path="/createBlog" element={<ProtectedRoute component={CreateBlog} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
