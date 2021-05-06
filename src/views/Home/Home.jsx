import React, { useEffect, useState } from "react";
import { AuthActions, MainActions } from "redux-store/models";
import { connect } from "react-redux";
import "styles/style_home.css";
import Room from "./Room";
import MessagesContainer from "./MessagesContainer";
import CreateRoom from "./CreateRoom";
import CheckPassword from "./CheckPassword";
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
  const isAdmin = loginData.isAdmin;
  const [formData, setFormData] = useState({
    visible: false,
    isPrivate: false,
  });
  const [validatePw, setValid] = useState({ popup: false });

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
  useEffect(() => {}, [validatePw]);
  //console.log("dataas activeRoom roomData", roomData);
  return (
    <div className="homePage">
      <div className="homePage--left">
        {rooms.map((room) => {
          return (
            <Room
              key={room._id}
              room={room}
              activeRoom={activeRoom}
              isAdmin={isAdmin}
              setActiveRoom={setActiveRoom}
              getRoomData={getRoomData}
              setValid={setValid}
              deleteRoom={deleteRoom}
              setRoomData={setRoomData}
              loginData={loginData}
            />
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
        <MessagesContainer
          roomData={roomData}
          loginData={loginData}
          activeRoom={activeRoom}
          submitMsg={submitMsg}
        />
      </div>
      {formData.visible && (
        <CreateRoom
          createRoom={createRoom}
          getRooms={getRooms}
          formData={formData}
          setFormData={setFormData}
          loginData={loginData}
        />
      )}
      {validatePw.popup && (
        <CheckPassword
          setActiveRoom={setActiveRoom}
          getRoomData={getRoomData}
          activeRoom={activeRoom}
          roomData={roomData}
          validatePw={validatePw}
          setValid={setValid}
        />
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
