import React, { useEffect } from "react";
import { AuthActions, MainActions } from "redux-store/models";
import { connect } from "react-redux";
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";
import * as Routes from "routes";
import "antd/dist/antd.css";
import "styles/general.css";
import { loadSocket } from "./socket";
const Root = ({ loginData = {}, loadingData }) => {
  useEffect(() => {
    loadSocket();
  }, []);
  return (
    <>
      <div className={"topLoading" + (loadingData ? " load" : "")}></div>
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
          <Route
            path="/register"
            render={() => {
              if (loginData.token) {
                return <Redirect to="/home" />;
              } else {
                return <Routes.Register />;
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

const mstp = ({ auth: { loginData }, main: { loadingData } }) => ({
  loginData,
  loadingData,
});
export default connect(mstp, { ...AuthActions, ...MainActions })(Root);
