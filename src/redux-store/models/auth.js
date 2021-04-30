import { createActions, createReducer } from "reduxsauce";

const { Types, Creators } = createActions({
  setUnauthorization: [],
  getLogin: ["username", "password"],
  setLoginData: ["loginData"],
  checkToken: ["token"],
  submitMsg: ["id", "text", "token"],
  createRoom: [
    "name",
    "image",
    "description",
    "token",
    "isPrivate",
    "password",
    "callBack",
  ],
  deleteRoom: ["id", "token"],
});

export const AuthTypes = Types;
export default Creators;

const INITIAL_STATE = {
  loginData: JSON.parse(localStorage.getItem("loginData") || "{}") || {},
};
export const reducer = createReducer(INITIAL_STATE, {
  SET_LOGIN_DATA: (state, { loginData }) => ({
    ...state,
    loginData,
  }),
  SET_UNAUTHORIZATION: () => {
    localStorage.setItem("loginData", "{}");
    return {
      ...INITIAL_STATE,
      loginData: {},
    };
  },
});
