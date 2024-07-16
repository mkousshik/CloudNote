import React, { useState } from "react";
import {useNavigate } from "react-router-dom";

const Signup = (props) => {
  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (signUpData.password !== signUpData.cpassword) {
      props.showAlert("Passwords do not match. Please try again.", "warning");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/createuser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: signUpData.name,
            email: signUpData.email,
            password: signUpData.password,
          }),
        }
      );
      const json = await response.json();
      // console.log(json);
      
      if (json.success) {
        //save the auth-token and redrict
        localStorage.setItem("token", json.authtoken);
        props.showAlert("Signup successful!", "success");
        navigate("/home");
      } else {
        props.showAlert("Sign-up attempt failed. Please re-enter your information.", "warning");
      }
    } catch (error) {
      console.log("Error during fetch:", error);
    }
  };
  const onChange = (e) => {
    setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-3 pt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="mt-5">Create an account to use CloudNote</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                placeholder="Enter name"
                onChange={onChange}
                value={signUpData.name}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="Enter email"
                onChange={onChange}
                value={signUpData.email}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Password"
                onChange={onChange}
                value={signUpData.password}
                minLength={8}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="cpassword"
                name="cpassword"
                placeholder="Confirm Password"
                onChange={onChange}
                value={signUpData.cpassword}
                minLength={8}
              />
            </div>
            <button type="submit" className="btn btn-primary my-2">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
