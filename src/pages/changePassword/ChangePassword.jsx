import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import "./ChangePassword.css";
import ApiService from "../../services/ApiService";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    
    const [errors, setErrors] = useState(false);
    const [msg, setMsg] = useState("");
    let type = sessionStorage.getItem("type");
  const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        const loginData = { newPassword: newPassword, oldPassword: oldPassword };
        ApiService.ChangePassword(loginData)
          .then((res) => {
            console.log(res.data);
            
            // sessionStorage.setItem("Access_Token", res.data.token);
            sessionStorage.setItem("type", res.data.role.toLowerCase());
            const role = res.data.role.toLowerCase();
            // setStatus(false);
           
            setErrors(false);
            alert(`Change password  Successful `);
            navigate(`/${role}`);
            setMsg("");
            setErrors(false);
          })
          .catch((error) => {
            // console.log(error);
            // setStatus(false);
            setErrors(true);
            alert(JSON.stringify(error));
            setMsg(
              error.response.data?.errorMessage
                ? error.response.data.errorMessage
                : error.message
            );
          });
      };
      const handleCancel = (e) => {
        e.preventDefault();
        navigate(`/${type}`);
      };




  return (
    <div id="changepassword" className="container-sm ">
 
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Old Password</Form.Label>
          <Form.Control
            required
            type="text"
             value={oldPassword}
            isInvalid={errors}
            onChange={(e) => setOldPassword(e.target.value)}
            placeholder="enter your old password"
          />
        </Form.Group>
        {errors && (
          <p className="text-danger mb-1">
            {msg}
            {/* The provided credentials do not match our records. */}
          </p>
        )}
        <Form.Group className="mb-3">
          <Form.Label>New Password </Form.Label>
          <Form.Control
            required
            type="password"
            value={newPassword}
             onChange={(e) => setNewPassword(e.target.value)}
            placeholder="enter your new password"
          />
        </Form.Group>
      <Button variant="primary" type="submit">
        submit
      </Button>{" "}
        <Button onClick={handleCancel} variant="danger">
          Cancel
        </Button>
    </Form>
  </div>
  )
}

export default ChangePassword