import { takeLatest, all } from "redux-saga/effects";

import * as AuthGenerators from "./AuthSagas";
import * as MainGenerators from "./MainSagas";

export default function* rootSaga() {
  yield all([
    // AUTH
    ...[
      takeLatest("GET_LOGIN", AuthGenerators.getLogin),
      takeLatest("CHECK_TOKEN", AuthGenerators.checkToken),
    ],
    // MAIN
    ...[
      takeLatest("GET_ROOMS", MainGenerators.getRooms),
      takeLatest("GET_ROOM_DATA", MainGenerators.getRoomData),
    ],
  ]);
}
