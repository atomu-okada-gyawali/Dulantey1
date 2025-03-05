// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Login from "./authcomponents/Login";
// import ProtectedRoute from "./ProtectedRoute"; // Assuming ProtectedRoute is implemented
// import BrowsePage from "./components/BrowsePage"; // Direct import
// import Profile from "./components/Profile"; // Direct import
// import CreateBlog from "./components/CreateBlog"; // Direct import
// import SignUp from "./authcomponents/SignUp"; // Direct import

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<BrowsePage />} />
//         <Route path="/profile" element={<Profile />} />
//         <Route path="/createBlog" element={<CreateBlog />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<SignUp />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./authcomponents/Login";
import ProtectedRoute from "./ProtectedRoute"; // Assuming ProtectedRoute is implemented
import BrowsePage from "./components/BrowsePage"; // Direct import
import Profile from "./components/Profile"; // Direct import
import CreateBlog from "./components/CreateBlog"; // Direct import
import SignUp from "./authcomponents/SignUp"; // Direct import
import HomePage from "./components/Homepage";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<BrowsePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/createBlog" element={<CreateBlog />} />
      </Routes>
    </Router>
  );
}

export default App;
