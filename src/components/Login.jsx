import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import GoogleButton from "react-google-button";
import { useUserAuth } from "../context/UserAuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { logIn, googleSignIn, user: currentUser } = useUserAuth();
  const navigate = useNavigate();
  
  // GET LAWYERS API
  const getUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/lawyers');
      if(response.ok){
        const data = await response.json();
        return data;
      } else {
        console.log("something is wrong")
      }
    } catch(err) {
      console.log("error", err)
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response =  await logIn(email, password);
      await navigateToCorrectPage(response.user.email);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await googleSignIn();
      await navigateToCorrectPage(response.user.email);
    } catch (error) {
      console.log(error.message);
    }
  };  

  const navigateToCorrectPage = async (userEmail) => {
    try {
      const lawyers = await getUsers();
  
      let foundMatch = false;
  
      for (let i = 0; i < lawyers.length; i++) {
        if (lawyers[i]?.emailId === userEmail) {
          foundMatch = true;
          navigate(`/${lawyers[i]._id}`);
          break;
        }
      }
      if (!foundMatch) {
        navigate('/home');
      }
    } catch (error) {
      console.error("Error fetching lawyer data:", error);
    }
  };

  return (
    <>
      <div className="p-4 box">
        <h2 className="mb-3 text-3xl font-semibold">CoLawab-Lawyers</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <div className="d-grid gap-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded mb-4">
            <Button variant="primary" type="Submit">
              Log In
            </Button>
          </div>
        </Form>
        <div className="w-full h-[1px] bg-gray-200 mb-4" />
        <div>
          <GoogleButton
            className="g-btn"
            type="dark"
            onClick={handleGoogleSignIn}
          />
        </div>
        <Link to="/phonesignup" style={{ textDecoration: "none" }}>
          <div className="d-grid gap-2 mt-3 bg-green-500 hover:bg-green-700 text-white rounded">
            <Button variant="success" type="Submit">
              Sign in with Phone
            </Button>
          </div>
        </Link>
      </div>
      <div className="p-4 box mt-3 text-center">
        Don't have an account? <Link to="/signup">Sign up</Link>
      </div>
    </>
  );
};

export default Login;
