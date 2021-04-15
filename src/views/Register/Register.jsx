import React, { useState } from "react";
import { AuthActions } from "redux-store/models";
import { connect } from "react-redux";
import LeftSide from "../Login/LeftSide";
import "styles/style_login.css";

const Register = ({ getLogin }) => {
  const [formData, setFormData] = useState({});
  console.log("ca ka", formData);
  return (
    <>
      <LeftSide />
      <form className="loginForm">
        <i className="fal fa-user-circle" aria-hidden="true"></i>{" "}
        <div>
          <i className="fal fa-user" aria-hidden="true"></i>
          <input
            type="text"
            placeholder="UserName"
            onChange={(e) => {
              setFormData({
                ...formData,
                username: e.target.value,
              });
            }}
          />
        </div>
        <div>
          <i className="fal fa-lock" aria-hidden="true"></i>
          <input
            placeholder="Passcode"
            type="text"
            onChange={(e) => {
              setFormData({
                ...formData,
                password: e.target.value,
              });
            }}
          />
        </div>
        <div>
          <i className="fal fa-lock" aria-hidden="true"></i>
          <input
            placeholder="Repeat Passcode"
            type="text"
            onChange={(e) => {
              setFormData({
                ...formData,
                password: e.target.value,
              });
            }}
          />
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            getLogin(formData.username, formData.password);
          }}
        >
          Register
        </button>
        <p>
          Already Signed Up?{" "}
          <span
            onClick={() => {
              window.location.hash = "login";
            }}
          >
            Login
          </span>
        </p>
      </form>
    </>
  );
};

export default connect(null, AuthActions)(Register);
