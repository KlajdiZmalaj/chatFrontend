import React from "react";
import { AuthActions } from "redux-store/models";
import { connect } from "react-redux";
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";
import * as Routes from "routes";
import "antd/dist/antd.css";
import "styles/general.css";
const Root = ({ loginData = {} }) => {
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
export default connect(mstp, { ...AuthActions })(Root);
