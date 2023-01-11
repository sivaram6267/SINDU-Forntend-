import React, { useState } from "react";
import "./home.css";
import Header from "../../components/header/Header";

import backgroundHome from "../../images/backgroundHome.png";
import background from "../../images/background.png";
import footerHome from "../../images/footerHome.png";

import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import jwt from "jwt-decode";
// import "./login.css";
import lancesoft_logo from "../../lancesoft_logo.png";
import ApiService from "../../services/ApiService";

const Home = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(false);
  const [status, setStatus] = useState(false);
  const [msg, setMsg] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const loginData = { username: username, password: password };
    setStatus(true);
    ApiService.login(loginData)
      .then((res) => {
        console.log(res.data);
        sessionStorage.setItem("Access_Token", res.data.token);
        sessionStorage.setItem("type", res.data.role.toLowerCase());
        const role = res.data.role.toLowerCase();
        const username = jwt(res.data.token).sub;
        // console.log(username);
        sessionStorage.setItem("username", username);

        sessionStorage.setItem("Id", res.data.empId);
        setStatus(false);
        sessionStorage.setItem("firstName", res.data.firstName);
        setErrors(false);
        // alert(`Login Successful `);
        navigate(`/${role}`);
        setMsg("");
        setErrors(false);
      })
      .catch((error) => {
        // console.log(error);
        setStatus(false);
        setErrors(true);
        alert(JSON.stringify(error));
        setMsg(
          error.response.data?.errorMessage
            ? error.response.data.errorMessage
            : error.message
        );
      });
  };
  // function Home() {
  return (
    <>
      <Header view="Home" />

      <div className="mainsection">
        <div className="imgcontainer">
          {/* <img src={backgroundHome} alt="background" className="imrc" /> */}
          <img src={background} alt="background" className="imrc" />
        </div>
        <div className="contentBox">
          <div id="login" className="container-sm  hh">
            <h1 className="title text-center">
              {/* Welcome */}
              <img
                src={lancesoft_logo}
                className="icon"
                alt="lancesoft_logo2"
              />
            </h1>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  required
                  type="text"
                  value={username}
                  isInvalid={errors}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="name@gmail.com"
                />
              </Form.Group>
              {errors && (
                <p className="text-danger mb-1">
                  {msg}
                  {/* The provided credentials do not match our records. */}
                </p>
              )}
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="enter your password"
                />
              </Form.Group>
              <Button type="submit" variant="success" className="login-button">
                Login
              </Button>
              {status && (
                <p className="text-success mb-1">
                  Please wait while we are processing your request.
                </p>
              )}
            </Form>
          </div>
        </div>
        {/* <div className="contentBox">
          <h1 className="homeHeader">GET DEMO</h1>
          <h2>ON EMPLOYEE PORTAL</h2>
          <p>
            Customisable Workflow Management Capablity Allows you to set up Your
            Business Processes. Optimize your operations with in-Bulit automated
            time sheet and attendance capture. Enable work from Home. improve
            Productivity. Employee Produvtivity.
          </p>

          <div className="btnBox">
            <div className="btns">View Demo</div>
          </div>
        </div> */}
        {/* </div> */}

        {/* <img src={footerHome} alt="footer" /> */}
      </div>
    </>
  );
};

export default Home;
