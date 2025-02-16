import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import BrowsePage from "./components/BrowsePage";
import Profile from "./components/Profile";
import CreateBlog from "./components/CreateBlog";
import Home from "./components/HomePage";
import RootLayout from "./layout/root-layout";
import { lazy } from "react";

// Lazy load authentication components
const SignUp = lazy(() => import("./authcomponents/SignUp"));
const LoadingFallback = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    }}
  >
    Loading...
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path=""
          element={
            <RootLayout>
              <Outlet />
            </RootLayout>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<BrowsePage />} />
          <Route path="/profile" element={<Profile />} />

          <Route path="/createBlog" element={<CreateBlog />} />
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/signup" element={<SignUp />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
