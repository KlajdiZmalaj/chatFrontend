import { put, call, select } from "redux-saga/effects";
import { notification } from "antd";
import AuthActions from "../models/auth";
import MainActions from "../models/main";
import * as MainReq from "services/main";

export function* getRegister({ username, password, redirectAndClear }) {
  const response = yield call(MainReq.register, username, password);
  if (response.data) {
    redirectAndClear();
    notification["success"]({
      description: response?.data?.message,
      placement: window.innerWidth <= 1024 ? "topRight" : "bottomRight",
      duration: 4,
    });
    if (response.data?.token) {
      yield put(
        AuthActions.setLoginData({
          token: response?.data?.token,
          username: response?.data?.userFound?.username,
          id: response?.data?.userFound?._id,
        })
      );
      localStorage.setItem(
        "loginData",
        JSON.stringify({
          token: response?.data?.token,
          username: response?.data?.userFound?.username,
          id: response?.data?.userFound?._id,
        })
      );
      window.location.hash = "home";
    }
  }
}

export function* getRooms({}) {
  const response = yield call(MainReq.getRooms);
  if (response.data) {
    yield put(MainActions.setRooms(response.data?.data));
  }
}

export function* getRoomData({ id }) {
  yield put(MainActions.setLoadingData(true));
  const response = yield call(MainReq.getRoomData, id);
  if (response.data) {
    yield put(MainActions.setRoomData(response.data?.data));
    yield put(MainActions.setLoadingData(false));
  }
}

export function* updateRoomMessages({ data }) {
  let roomData = yield select((state) => {
    return state.main.roomData;
  });

  roomData = {
    ...roomData,
    messages: [...roomData.messages, data],
  };
  yield put(MainActions.setRoomData(roomData));
}
