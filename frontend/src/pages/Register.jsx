import React, { useState } from "react";
import "../../src/assests/styles/login.css";

function Register() {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [users, setUsers] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (userData.password === userData.confirmPassword) {
      setUsers((prevUsers) => [...prevUsers, userData]);
      console.log("User registered:", userData);
      setUserData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      users.map((user) => {
        console.log("Registerd User is ", user);
      });
    } else {
      console.log("Passwords do not match");
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
            Register
          </h1>

          <form onSubmit={handleSubmit}>
            <div className="form-group mb-4">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control form-control-lg"
                id="username"
                name="username"
                value={userData.username}
                onChange={handleChange}
              />
            </div>

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

            <div className="form-group mb-4">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                className="form-control form-control-lg"
                id="confirmPassword"
                name="confirmPassword"
                value={userData.confirmPassword}
                onChange={handleChange}
              />
            </div>

            <button className="btn btn-primary mb-4 w-100 btn-lg" type="submit">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
