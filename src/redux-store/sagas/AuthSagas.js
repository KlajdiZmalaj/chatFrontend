import { put, call } from "redux-saga/effects";
import AuthActions from "../models/auth";

import * as AuthReq from "services/auth";
import { notification } from "antd";

export function* getLogin({ username, password }) {
  const response = yield call(AuthReq.Login, username, password);

  if (response) {
    console.log("response", response);
    yield put(AuthActions.setLoginData(response.data));
    if (response.data?.token) {
      localStorage.setItem("loginData", JSON.stringify(response.data));
    }
  }
}

export function* checkToken({ token }) {
  const response = yield call(AuthReq.checkToken, token);
  if (response?.data) {
    notification["success"]({
      description: JSON.stringify(response?.data),
      placement: window.innerWidth <= 1024 ? "topRight" : "bottomRight",
      duration: 4,
    });
  }
  console.log("response check token", response?.data);
}
