import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import navlogo from "../assests/images/navbarlogo.jpg";
import "../assests/styles/navbar.css";

const Navbar = () => {
  const [showNav, setShowNav] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in when component mounts
    const token = localStorage.getItem("authorization");
    if (token) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={navlogo} alt="BookReview" className="navbar-logo" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setShowNav(!showNav)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse ${showNav ? "show" : ""}`}
          id="navbarNav"
        >
          <ul className="navbar-nav">
            {/* <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li> */}
            {!loggedIn && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/user/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/user/register">
                    Register
                  </Link>
                </li>
              </>
            )}
            {loggedIn && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard" tabIndex="-1">
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/logout">
                    Logout
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
