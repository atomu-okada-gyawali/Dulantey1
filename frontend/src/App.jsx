import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BrowsePage from './components/BrowsePage'; 
import Profile from './components/Profile'; 
import CreateBlog from './components/CreateBlog';

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
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/BrowsePage" element={<BrowsePage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/createBlog" element={<CreateBlog />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
