import React from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/UserAuthContext";
import FormComponent from "./Form";

const Home = () => {
  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="container mt-5">
      <div className="p-2 mt-2 text-center">
        Hello Welcome <br />
        {user && user.email}
      </div>
      <FormComponent />
      <div className="d-grid m-2">
        <Button variant="primary" onClick={handleLogout}>
          Log out
        </Button>
      </div>
    </div>
  );
};

export default Home;
