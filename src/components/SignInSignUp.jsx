import React from "react";
import { Link } from "react-router-dom";
import "../Auth.css";

const SignInSignUp = () => {
  return (
    <div>
      <div className="auth-container">
        <h2>Sign In / Sign Up</h2>
        <p>Please sign in or sign up to curate your favourite artworks.</p>
        <div className="auth-buttons">
          <Link to="/signin">
            <button className="auth-button">Sign In</button>
          </Link>
          <Link to="/signup">
            <button className="auth-button">Sign Up</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignInSignUp;
