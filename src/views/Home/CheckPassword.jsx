import React from "react";
export default ({
  setActiveRoom,
  getRoomData,
  activeRoom,
  setValid,
  validatePw,
}) => {
  return (
    <div className="popUpForm">
      <div className="popUpForm--title">
        Room Password{" "}
        <i
          onClick={() => setValid({ popup: false })}
          className="fal fa-times"
          aria-hidden="true"
        ></i>{" "}
      </div>
      <div className="popUpForm--field">
        <span>PIN : </span>
        <input
          type="password"
          readOnly
          onClick={(e) => {
            e.target.readOnly = false;
          }}
          onChange={(e) =>
            setValid({ ...validatePw, passwordCheck: e.target.value })
          }
        />
      </div>
      <div className="popUpForm--field">
        <button
          onClick={() => {
            if (validatePw.password === validatePw.passwordCheck) {
              setValid({ popup: false });
              setActiveRoom(validatePw.roomId);
              getRoomData(validatePw.roomId);
              if (activeRoom) {
                window.socket.emit("unsubscribe", activeRoom);
              }
              window.socket.emit("subscribe", validatePw.roomId);
            }
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};
