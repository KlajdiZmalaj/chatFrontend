import { createActions, createReducer } from "reduxsauce";

const { Types, Creators } = createActions({
  setRoomData: ["roomData"],
  getRoomData: ["id"],
  getRooms: [],
  setRooms: ["rooms"],
  setActiveRoom: ["activeRoom"],
  updateRoomMessages: ["data"],
});

export const MainTypes = Types;
export default Creators;

const INITIAL_STATE = {
  roomData: {},
  rooms: [],
  activeRoom: "",
};
export const reducer = createReducer(INITIAL_STATE, {
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
