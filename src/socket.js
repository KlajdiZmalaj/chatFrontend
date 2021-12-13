import { io } from "socket.io-client";
import { isLocal } from "config";
const socketUrlLocal = "http://localhost:5000";
const socketUrl = "https://chat-al.herokuapp.com";
export const loadSocket = () => {
  const socket = io(isLocal ? socketUrlLocal : socketUrl);
  window.socket = socket;
  socket.on("connect", () => {
    console.log("socket connected");
  });
  socket.on("FromAPI", (data) => {
    console.log("FromAPI", data);
  });
  socket.on("chat_msg", (data) => {
    console.log("chat_msg", data);
    window.store.dispatch({
      type: "UPDATE_ROOM_MESSAGES",
      data,
    });
    document
      .querySelector(".msg:last-child")
      .scrollIntoView({ behavior: "smooth" });
  });

  socket.on("message", function (data) {
    console.log("message", data);
  });
};
