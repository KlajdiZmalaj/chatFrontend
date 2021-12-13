import { put, call } from "redux-saga/effects";
import AuthActions from "../models/auth";

import * as AuthReq from "services/auth";
import { notification } from "antd";

export function* getLogin({ username, password }) {
  const response = yield call(AuthReq.Login, username, password);

  if (response) {
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
}

export function* submitMsg({ id, text, token ,imgObj }) {
  const response = yield call(AuthReq.submitMsg, id, text, token,imgObj);
  if (response.data) {
  }
}
export function* createRoom({
  name,
  image,
  description,
  isPrivate,
  password,
  token,
  callBack,
}) {
  const response = yield call(
    AuthReq.createRoom,
    name,
    image,
    description,
    isPrivate,
    password,
    token
  );
  //console.log("response", response);
  if (response.data) {
    notification["success"]({
      description: JSON.stringify(response?.data),
      placement: window.innerWidth <= 1024 ? "topRight" : "bottomRight",
      duration: 4,
    });
    callBack();
  }
}

export function* deleteRoom({ id, token }) {
  const response = yield call(AuthReq.deleteRoom, id, token);
  if (response.data) {
    notification["success"]({
      description: JSON.stringify(response?.data),
      placement: window.innerWidth <= 1024 ? "topRight" : "bottomRight",
      duration: 4,
    });
    yield put({ type: "GET_ROOMS" });
    //window.store.dispatch({ type: "GET_ROOMS" });
  }
}

export function* deleteMessage({ roomId, msgId, token }) {
  const response = yield call(AuthReq.deleteMessage, roomId, msgId, token);
  if (response.data) {
    // notification["success"]({
    //   description: response?.data?.message,
    //   placement: window.innerWidth <= 1024 ? "topRight" : "bottomRight",
    //   duration: 4,
    // });
    yield put({ type: "GET_ROOM_DATA", id: roomId });
  }
}
