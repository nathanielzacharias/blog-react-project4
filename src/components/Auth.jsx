import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function (props) {
  const [authMode, setAuthMode] = useState("login");

  const changeAuthMode = () => {
    setAuthMode(authMode === "login" ? "register" : "login");
  };

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    const data = new FormData(event.currentTarget);
    setFormData({
      username: data.get('username'),
      password: data.get('password'),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);

    fetch(`${process.env.REACT_APP_BASE_BACKEND_URL}/api/v1/user/login`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => {
        if (jsonResponse.error) {
          console.log("jsonResponse", jsonResponse);
          toast.error(jsonResponse.error);
          return;
        }

        toast.success("Login Successful!");

        // store the token into localstorage / cookie
        localStorage.setItem("user_token", jsonResponse.token);
        console.log(jsonResponse.token);

        navigate("/api/v1/main/browse");
      })
      .catch((err) => {
        console.log(err.response);
        toast.error(err.message);
      });
  };

  if (authMode === "login") {
    return (
      <div className="Auth-form-container">
        <form
          className="Auth-form"
        //   onSubmit={handleSubmit}
        //   onChange={handleChange}
        >
          <div className="Auth-form-content"  onChange={handleChange}>
            <h3 className="Auth-form-title">Login</h3>
            <div className="text-center">
              Not registered yet?{" "}
              <span className="link-primary" onClick={changeAuthMode}>
                Register
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Username</label>
              <input
                type="username"
                name="username"
                className="form-control mt-1"
                // placeholder="Enter email"
                // onChange={handleChange}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                name="password"
                className="form-control mt-1"
                // placeholder="Enter password"
                // onChange={handleChange}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-secondary" onSubmit={handleSubmit}>
                Submit
              </button>
            </div>
            {/* <p className="text-center mt-2">
              Forgot <a href="#">password?</a>
            </p> */}
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Register</h3>
          <div className="text-center">
            Already registered?{" "}
            <span className="link-primary" onClick={changeAuthMode}>
              Login
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Username</label>
            <input
              type="username"
              className="form-control mt-1"
              //   placeholder="e.g Jane Doe"
            />
          </div>
          <div className="form-group mt-3">
            <label>Email </label>
            <input
              type="email"
              className="form-control mt-1"
              //   placeholder="Email "
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              //   placeholder="Password"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-secondary">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
