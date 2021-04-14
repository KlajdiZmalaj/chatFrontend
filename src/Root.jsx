import React, { useEffect } from "react";
import { AuthActions, MainActions } from "redux-store/models";
import { connect } from "react-redux";
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";
import * as Routes from "routes";
import "antd/dist/antd.css";
import "styles/general.css";
import { io } from "socket.io-client";

const Root = ({ loginData = {}, updateRoomMessages }) => {
  useEffect(() => {
    const socket = io("http://localhost:5000");
    socket.on("connect", (data) => {
      console.log("connected", data);
    });
    socket.on("FromAPI", (data) => {
      console.log("FromAPI", data);
    });
    socket.on("chat_msg", (data) => {
      console.log("chat_msg", data);
      updateRoomMessages(data);
    });
  }, []);
  return (
    <>
      <HashRouter>
        <Switch>
          <Route exact path="/">
            {loginData.token ? (
              <Redirect to="/home" />
            ) : (
              <Redirect to="/login" />
            )}
          </Route>

          <Route
            path="/login"
            render={() => {
              if (loginData.token) {
                return <Redirect to="/home" />;
              } else {
                return <Routes.Login />;
              }
            }}
          />
          <Route path="/home">
            {loginData.token ? <Routes.Home /> : <Redirect to="/login" />}
          </Route>
        </Switch>
      </HashRouter>
    </>
  );
};

const mstp = ({ auth: { loginData } }) => ({ loginData });
export default connect(mstp, { ...AuthActions, ...MainActions })(Root);
