import React, { useState } from "react";
import { Tooltip, Dropdown } from "antd";
import moment from "moment";

export default ({ roomData, loginData, activeRoom, submitMsg }) => {
  const [inputValue, setInputMsg] = useState("");

  return (
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
                  <Dropdown
                    overlay={
                      <div className="ddMenu">
                        Delete Message{" "}
                        <i className="fal fa-trash" aria-hidden="true"></i>
                      </div>
                    }
                    trigger={["contextMenu"]}
                  >
                    <div
                      className={`msg${
                        loginData?.username === msg?.user?.username ? " me" : ""
                      }`}
                    >
                      <div className="userMsg">{msg?.user?.username}</div>
                      <div className="text">{msg?.text}</div>
                    </div>
                  </Dropdown>
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
          name="msgType"
          autoComplete="off"
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
  );
};
