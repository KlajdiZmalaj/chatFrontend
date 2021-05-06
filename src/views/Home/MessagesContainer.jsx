import React, { useState, useEffect } from "react";
import { Tooltip, Dropdown } from "antd";
import moment from "moment";

export default ({ roomData, loginData, activeRoom, submitMsg }) => {
  const [inputValue, setInputMsg] = useState("");
  const [visible, handleVisibleChange] = useState(false);
  const [emojiCategories, setCat] = useState([]);
  const [activeEmojiCat, setActiveEmojiCat] = useState("");
  //const [activeEmojiSubCat, setActiveEmojiSubCat] = useState("");
  const [emojis, setEmojis] = useState([]);
  useEffect(() => {
    const funx = async () => {
      const catres = await fetch(
        "https://emoji-api.com/categories?access_key=134301967264b9e3817d636e2373d73d653a102d"
      );
      const dataCat = await catres.json();
      setCat(dataCat);
      setActiveEmojiCat(dataCat[0].slug);
    };
    funx();
  }, []);
  useEffect(() => {
    const funx = async () => {
      setEmojis([]);
      const emojisres = await fetch(
        `https://emoji-api.com/categories/${activeEmojiCat}?access_key=134301967264b9e3817d636e2373d73d653a102d`
      );
      const emojisData = await emojisres.json();
      setEmojis(emojisData?.slice(0, 400));
      //console.log("emojisData", emojisData);
    };
    if (activeEmojiCat) {
      funx();
    }
  }, [activeEmojiCat]);
  //console.log("emojiCategories", emojiCategories);

  return (
    <div className="homePage--right__messages">
      <div id="msgWrapper" className="msg-wrapper">
        {roomData?.messages ? (
          roomData?.messages
            ?.sort((a, b) => a - b)
            .map((msg) => {
              return (
                <Tooltip
                  key={msg.date}
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
        <Dropdown
          trigger={["click"]}
          onVisibleChange={handleVisibleChange}
          visible={visible}
          overlay={
            <div className="emojis">
              <div className="emojis--categories">
                {emojiCategories.map((item) => {
                  return (
                    <span
                      key={item.slug}
                      className={activeEmojiCat === item.slug ? "active" : ""}
                      onClick={() => {
                        setActiveEmojiCat(item.slug);
                      }}
                    >
                      {item.slug}
                    </span>
                  );
                })}
              </div>
              {/* <div className="emojis--categories">
                {emojiCategories
                  .filter((e) => e.slug === activeEmojiCat)
                  .map((item) => {
                    return item.subCategories.map((item) => (
                      <span
                        key={item._id}
                        className={activeEmojiSubCat === item ? "active" : ""}
                        onClick={() => {
                          setActiveEmojiSubCat(item);
                        }}
                      >
                        {item}
                      </span>
                    ));
                  })}
              </div> */}
              <div className="emojis--icons">
                {emojis?.length > 0 ? (
                  (emojis || []).map((emoji) => (
                    <Tooltip title={emoji.slug} key={emoji.slug}>
                      <span
                        onClick={() => {
                          setInputMsg(`${inputValue}${emoji.character}`);
                        }}
                      >
                        {emoji.character}
                      </span>
                    </Tooltip>
                  ))
                ) : (
                  <div>Loading Emojis...</div>
                )}
              </div>
            </div>
          }
          placement="topLeft"
          arrow
        >
          <i className="far fa-grin-stars"></i>
        </Dropdown>

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
