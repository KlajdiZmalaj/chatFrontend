import React, { useState } from "react";

export default ({
  room,
  activeRoom,
  isAdmin,
  setActiveRoom,
  getRoomData,
  setValid,
  deleteRoom,
  setRoomData,
  loginData,
}) => {
  const [dragX, setDragX] = useState(0);
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
        if (!room.isPrivate) {
          setActiveRoom(room._id);
          getRoomData(room._id);
          if (activeRoom) {
            window.socket.emit("unsubscribe", activeRoom);
          }
          window.socket.emit("subscribe", room._id);
        } else {
          setValid({
            popup: true,
            password: room.password,
            roomId: room._id,
          });
        }
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
      {room?.isPrivate && <i className="fal fa-user-shield"></i>}
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
};
