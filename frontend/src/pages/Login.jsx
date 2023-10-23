import React from "react";
import "../../src/assests/styles/login.css";

function Login() {
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

          <div className="form-group mb-4">
            <label htmlFor="formControlLg">Email address</label>
            <input
              type="email"
              className="form-control form-control-lg"
              id="formControlLg"
            />
          </div>

          <div className="form-group mb-4">
            <label htmlFor="formControlLg">Password</label>
            <input
              type="password"
              className="form-control form-control-lg"
              id="formControlLg"
            />
          </div>

          <div className="d-flex justify-content-between mx-4 mb-4">
            <a href="!#">Forgot password?</a>
          </div>

          <button className="btn btn-primary mb-4 w-100 btn-lg">Sign in</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
