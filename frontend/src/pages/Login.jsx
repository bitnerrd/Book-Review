import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ email: "", password: "" });
  const { email, password } = userData;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3003/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.status) {
        localStorage.setItem("authorization", data.data.token);
        toast.success(data.message);
        navigate("/dashboard");
      } else {
        toast.error(data.message || "Unexpected error");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="container-fluid p-3 my-5 d-flex justify-content-center">
      <div className="login-container row w-100 justify-content-center">
        <div className="col-12 col-md-6 d-flex">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
            className="img-fluid"
            alt="Phone image"
          />
        </div>
        <div className="col-12 col-md-6">
          <h1 className="login" style={{ textAlign: "center" }}>
            Login
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-4">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control form-control-lg"
                id="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control form-control-lg"
                id="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
              />
            </div>
            <button className="btn btn-primary mb-4 w-100 btn-lg" type="submit">
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
