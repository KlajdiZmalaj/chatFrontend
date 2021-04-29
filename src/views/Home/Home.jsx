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
  createRoom,
  deleteRoom,
}) => {
  useEffect(() => {
    checkToken(loginData.token);
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
  const [formData, setFormData] = useState({ visible: false });
  const isAdmin = loginData.isAdmin;
  const [dragX, setDragX] = useState(0);
  //console.log("dataas activeRoom roomData", roomData);
  return (
    <div className="homePage">
      <div className="homePage--left">
        {rooms.map((room) => {
          return (
            <div
              key={room._id}
              room-id={room._id}
              className={`room${activeRoom === room._id ? " active" : ""}${
                dragX === room._id ? " slideRight" : ""
              }`}
              draggable={isAdmin}
              onDragStart={(e) => {
                setDragX(0);
                setDragX(e.clientX);
              }}
              onDragEnd={(e) => {
                console.log("ca ka e", e, e.clientX, e.clientY);
                if (e.clientX - dragX >= 100) {
                  setDragX(room._id);
                }
              }}
              onClick={() => {
                setActiveRoom(room._id);
                getRoomData(room._id);
                if (activeRoom) {
                  window.socket.emit("unsubscribe", activeRoom);
                }
                window.socket.emit("subscribe", room._id);
              }}
            >
              <i
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  deleteRoom(room._id, loginData.token);
                }}
                className="fal fa-times"
                aria-hidden="true"
              ></i>
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
        {isAdmin && (
          <button
            onClick={() => {
              setFormData({ ...formData, visible: true });
            }}
            className="createRoom"
          >
            Create Room
          </button>
        )}
      </div>
      <div className="homePage--right">
        <div className="homePage--right__top">
          <p>
            Welcome <span>{loginData.username}</span>{" "}
          </p>
          <p id="roomName">{roomData?.name || "Select a Room"}</p>
          {/* <button
            onClick={() => {
              checkToken(loginData.token);
            }}
          >
            <i className="fal fa-badge-check"></i> Check token
          </button> */}
          <button
            onClick={() => {
              setUnauthorization();
            }}
          >
            <i className="fal fa-sign-out"></i> Log OUT
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
              value={inputValue}
              onKeyPress={(e) => {
                if (e.charCode == 13) {
                  setInputMsg("");
                  submitMsg(roomData._id, inputValue, loginData?.token);
                }
              }}
              onChange={(e) => {
                setInputMsg(e.target.value);
              }}
            />
            <i
              className="fad fa-paper-plane"
              onClick={() => {
                setInputMsg("");
                submitMsg(roomData._id, inputValue, loginData?.token);
              }}
            ></i>
          </div>
        </div>
      </div>
      {formData.visible && (
        <div className="popUpForm">
          <div className="popUpForm--title">
            Create Room{" "}
            <i
              onClick={() => {
                setFormData({ ...formData, visible: false });
              }}
              className="fal fa-times"
              aria-hidden="true"
            ></i>{" "}
          </div>
          <div className="popUpForm--field">
            <span>Name : </span>{" "}
            <input
              type="text"
              value={formData.name}
              placeholder="#"
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
              }}
            />
          </div>
          <div className="popUpForm--field">
            <span>Description : </span>{" "}
            <input
              type="text"
              value={formData.desc}
              placeholder="#"
              onChange={(e) => {
                setFormData({ ...formData, desc: e.target.value });
              }}
            />
          </div>
          <div className="popUpForm--field">
            <span>Image URL : </span>{" "}
            <input
              type="text"
              placeholder="https://imageURL.com"
              value={formData.img}
              onChange={(e) => {
                setFormData({ ...formData, img: e.target.value });
              }}
            />
          </div>
          <div className="popUpForm--field">
            <button
              onClick={() => {
                createRoom(
                  formData.name,
                  formData.img,
                  formData.desc,
                  loginData.token,
                  () => {
                    setFormData({ visible: false });
                    getRooms();
                  }
                );
              }}
            >
              Submit
            </button>
          </div>
        </div>
      )}
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
