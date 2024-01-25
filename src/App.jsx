import { Container, Row, Col } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import PhoneSignUP from "./components/PhoneSignUP";
import Profile from "./components/Profile";
import Edit from "./components/Edit";

function App() {
  return (
    <UserAuthContextProvider>
      <Router>
        <Routes>
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Login />} />
          <Route path="/phonesignup" element={<PhoneSignUP />} />
          <Route path="/signup" element={<Signup />} />
          <Route
              path="/:id"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit/:id"
              element={
                <ProtectedRoute>
                  <Edit />
                </ProtectedRoute>
              }
            />
        </Routes>
      </Router>
    </UserAuthContextProvider>
  );
}

export default App;
