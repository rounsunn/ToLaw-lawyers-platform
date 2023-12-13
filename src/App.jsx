import { Container, Row, Col } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import ProtectedRoute from "./components/ProtectedRoute";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import PhoneLogin from "./components/PhoneLogin";

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
          <Route path="/phonelogin" element={<PhoneLogin />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </UserAuthContextProvider>
  );
}

export default App;
