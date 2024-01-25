import React from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/UserAuthContext";
import FormComponent from "./Forms";

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
  console.log(user);

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center p-2 mt-2">
        <div className=" text-center">
          Hello & Welcome <br />
          <p className="fw-bold">{user && user.displayName}</p>
        </div>
        <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleLogout}>
          Log out
        </Button>
      </div>
      <FormComponent />
    </div>
  );
};

export default Home;
