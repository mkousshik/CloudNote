import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
    const [userLoginData, setUserLoginData] = useState({email: "", password: ""});
    let navigate = useNavigate();
    const onChange=(e) =>{
        setUserLoginData({...userLoginData, [e.target.name]: e.target.value})
      }

      const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(userLoginData);
        try {
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: userLoginData.email,
                    password: userLoginData.password,
                }),
            });
            const json = await response.json();
            console.log(json);

            if(json.success){
              //save the auth-token and redrict
              localStorage.setItem('token', json.authtoken);
              props.showAlert("Login successful!", "success");
              navigate("/home");
            }
            else{
              props.showAlert("Invalid login, Caitria. Please try again.", "warning");
            }
        } catch (error) {
            console.error("Error during fetch:", error);
        }
    };
    
  return (
    <div className="container mt-3 pt-5">
      <form className="row justify-content-center" onSubmit={handleSubmit}>
        <div className="col-md-6">
        <h2 className="mt-5">Sign in to access your CloudNote</h2>
        <div className="mt-5">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            onChange={onChange}
            value={userLoginData.email}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={onChange}
            value={userLoginData.password}
            minLength={8}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
