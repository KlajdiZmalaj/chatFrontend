import React from "react";
import { AuthActions } from "redux-store/models";
import { connect } from "react-redux";
import "styles/style_home.css";
const Home = ({ loginData = {}, setUnauthorization, checkToken }) => {
  console.log("accountInfo", loginData);
  return (
    <div className="homePage">
      <button
        onClick={() => {
          setUnauthorization();
        }}
      >
        Log OUT
      </button>
      <button
        onClick={() => {
          checkToken(loginData.token);
        }}
      >
        Check token{" "}
      </button>
      <h1>{loginData.username}</h1>
    </div>
  );
};

const mstp = ({ auth: { loginData } }) => ({ loginData });

export default connect(mstp, AuthActions)(Home);
