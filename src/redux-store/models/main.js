import { createActions, createReducer } from "reduxsauce";

const { Types, Creators } = createActions({
  setRoomData: ["roomData"],
  getRoomData: ["id"],
  getRooms: [],
  setRooms: ["rooms"],
  setActiveRoom: ["activeRoom"],
  updateRoomMessages: ["data"],
  getRegister: ["username", "password", "redirectAndClear"],
  setLoadingData: ["loadingData"],
});

export const MainTypes = Types;
export default Creators;

const INITIAL_STATE = {
  roomData: {},
  rooms: [],
  activeRoom: "",
  loadingData: false,
};
export const reducer = createReducer(INITIAL_STATE, {
  SET_LOADING_DATA: (state, { loadingData }) => ({
    ...state,
    loadingData,
  }),
  SET_ROOM_DATA: (state, { roomData }) => ({
    ...state,
    roomData,
  }),
  SET_ROOMS: (state, { rooms }) => ({
    ...state,
    rooms,
  }),
  SET_ACTIVE_ROOM: (state, { activeRoom }) => ({
    ...state,
    activeRoom,
  }),
});
