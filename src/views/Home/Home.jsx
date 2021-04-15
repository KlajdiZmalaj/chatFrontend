import React, { useEffect, useState } from "react";
import { AuthActions, MainActions } from "redux-store/models";
import { connect } from "react-redux";
import "styles/style_home.css";
import { Tooltip } from "antd";
import moment from "moment";
const Home = ({
  loginData = {},
  setUnauthorization,
  getRooms,
  rooms,
  setActiveRoom,
  activeRoom,
  getRoomData,
  roomData,
  setRoomData,
  checkToken,
  submitMsg,
}) => {
  useEffect(() => {
    getRooms();
  }, []);
  useEffect(() => {
    const el = document.querySelector(".msg:last-child");
    if (el)
      setTimeout(() => {
        el.scrollIntoView({ behavior: "smooth" });
      }, 300);
  }, [roomData?.name]);
  const [inputValue, setInputMsg] = useState("");
  //console.log("dataas activeRoom roomData", roomData);
  return (
    <div className="homePage">
      <div className="homePage--left">
        {rooms.map((room) => {
          return (
            <div
              key={room._id}
              room-id={room._id}
              className={`room${activeRoom === room._id ? " active" : ""}`}
              onClick={() => {
                setActiveRoom(room._id);
                getRoomData(room._id);
                if (activeRoom) {
                  window.socket.emit("unsubscribe", activeRoom);
                }
                window.socket.emit("subscribe", room._id);
              }}
            >
              <img src={room?.image} alt="" /> <span>{room?.name}</span>
              {activeRoom === room._id ? (
                <i
                  className="fal fa-sign-out"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setActiveRoom("");
                    setRoomData({});
                  }}
                ></i>
              ) : null}
            </div>
          );
        })}
      </div>
      <div className="homePage--right">
        <div className="homePage--right__top">
          <p>
            Welcome <span>{loginData.username}</span>{" "}
          </p>
          <p id="roomName">{roomData?.name || "Select a Room"}</p>
          <button
            onClick={() => {
              checkToken(loginData.token);
            }}
          >
            Check token
          </button>
          <button
            onClick={() => {
              setUnauthorization();
            }}
          >
            Log OUT
          </button>
        </div>
        <div className="homePage--right__cover">
          <div style={{ backgroundImage: `url(${roomData?.image})` }}>
            <div></div>
            <img src={roomData?.image} alt="" />
          </div>
        </div>
        <div className="homePage--right__messages">
          <div id="msgWrapper" className="msg-wrapper">
            {roomData?.messages ? (
              roomData?.messages
                ?.sort((a, b) => a - b)
                .map((msg) => {
                  return (
                    <Tooltip
                      key={msg._id}
                      placement={
                        loginData?.username === msg?.user?.username
                          ? "topRight"
                          : "topLeft"
                      }
                      title={`Sent at ${moment(msg.date).format(
                        "MMMM Do YYYY, h:mm:ss a"
                      )}`}
                    >
                      <div
                        className={`msg${
                          loginData?.username === msg?.user?.username
                            ? " me"
                            : ""
                        }`}
                      >
                        <div className="userMsg">{msg?.user?.username}</div>
                        <div className="text">{msg?.text}</div>
                      </div>
                    </Tooltip>
                  );
                })
            ) : (
              <span>
                {!activeRoom
                  ? "No room selected."
                  : "No messages yet in this room. Start typing your first message."}
              </span>
            )}
          </div>
          <div className={!activeRoom ? "disable inputbar" : "inputbar"}>
            <i className="far fa-grin-stars"></i>
            <input
              type="text"
              onChange={(e) => {
                setInputMsg(e.target.value);
              }}
            />
            <i
              className="fad fa-paper-plane"
              onClick={() => {
                submitMsg(roomData._id, inputValue, loginData?.token);
              }}
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
};

const mstp = ({
  auth: { loginData },
  main: { rooms, activeRoom, roomData },
}) => ({
  loginData,
  rooms,
  activeRoom,
  roomData,
});

export default connect(mstp, { ...MainActions, ...AuthActions })(Home);
