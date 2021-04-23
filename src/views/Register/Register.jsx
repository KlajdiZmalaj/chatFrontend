import React, { useState } from "react";
import { MainActions } from "redux-store/models";
import { connect } from "react-redux";
import LeftSide from "../Login/LeftSide";
import "styles/style_login.css";
import { notification } from "antd";

const Register = ({ getRegister }) => {
  const [formData, setFormData] = useState({});
  const redirectAndClear = () => {
    setFormData({ username: "", password: "", password2: "" });
  };
  return (
    <>
      <LeftSide />
      <form className="loginForm">
        <i className="fal fa-user-plus" aria-hidden="true"></i>
        <div>
          <i className="fal fa-user" aria-hidden="true"></i>
          <input
            type="text"
            placeholder="UserName"
            value={formData.username}
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
            value={formData.password}
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
            value={formData.password2}
            onChange={(e) => {
              setFormData({
                ...formData,
                password2: e.target.value,
              });
            }}
          />
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (
              formData.username &&
              formData.password &&
              formData.password === formData.password2
            ) {
              getRegister(
                formData.username,
                formData.password,
                redirectAndClear
              );
            } else {
              notification["error"]({
                description: "Passwords are not the same",
                placement:
                  window.innerWidth <= 1024 ? "topRight" : "bottomRight",
                duration: 4,
              });
            }
          }}
        >
          Register
        </button>
        <p>
          Already Signed Up?
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

export default connect(null, MainActions)(Register);
