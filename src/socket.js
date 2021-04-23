import { io } from "socket.io-client";

export const loadSocket = () => {
  const socket = io("http://192.168.5.220:5000");
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
