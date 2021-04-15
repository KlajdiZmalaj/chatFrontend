import { put, call, select } from "redux-saga/effects";
// import AuthActions from "../models/auth";
import MainActions from "../models/main";
import * as MainReq from "services/main";

export function* getRooms({ token }) {
  const response = yield call(MainReq.getRooms);
  if (response.data) {
    yield put(MainActions.setRooms(response.data?.data));
  }
}

export function* getRoomData({ id }) {
  const response = yield call(MainReq.getRoomData, id);
  if (response.data) {
    yield put(MainActions.setRoomData(response.data?.data));
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
