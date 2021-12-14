import React, { useState, useEffect } from "react";
import { Tooltip, Dropdown } from "antd";
import moment from "moment";
import { b64toBlob } from "../../utils";

const handleFileChosen = async (file) => {
  return new Promise((resolve, reject) => {
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      const b64 = e.target.result;
      const url = b64toBlob(b64, file.type)[0];
      const blobi = b64toBlob(b64, file.type)[1];

      resolve({
        file: file,
        id: `${file.name}${file.size}`,
        name: file.name,
        url,
        blobi,
        type: file.type,
        base64: b64,
      });
    };
    fileReader.readAsDataURL(file);
    fileReader.onerror = reject;
  });
};

export default ({ roomData, loginData, activeRoom, submitMsg, setLoadingData, deleteMessage }) => {
  const [visible, handleVisibleChange] = useState(false);
  const [emojiCategories, setCat] = useState([]);
  const [activeEmojiCat, setActiveEmojiCat] = useState("");
  //const [activeEmojiSubCat, setActiveEmojiSubCat] = useState("");
  const [emojis, setEmojis] = useState([]);
  const [stateFiles, setFiles] = useState([]);
  useEffect(() => {
    const funx = async () => {
      const catres = await fetch(
        "https://emoji-api.com/categories?access_key=134301967264b9e3817d636e2373d73d653a102d",
      );
      const dataCat = await catres.json();
      setCat(dataCat);
      setActiveEmojiCat(dataCat[0].slug);
    };
    funx();
  }, []);
  useEffect(() => {
    setLoadingData(true);
    const funx = async () => {
      setEmojis([]);
      const emojisres = await fetch(
        `https://emoji-api.com/categories/${activeEmojiCat}?access_key=134301967264b9e3817d636e2373d73d653a102d`,
      );
      const emojisData = await emojisres.json();
      setEmojis(emojisData?.slice(0, 400));
      setLoadingData(false);
      //console.log("emojisData", emojisData);
    };
    if (activeEmojiCat) {
      funx();
    }
  }, [activeEmojiCat]);
  useEffect(() => {
    if (!visible) {
      setEmojis([]);
    }
  }, [visible]);

  console.log("stateFiles", stateFiles);
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
                  placement={loginData?.username === msg?.user?.username ? "topRight" : "topLeft"}
                  title={`Sent at ${moment(msg.date).format("MMMM Do YYYY, h:mm:ss a")}`}
                >
                  <Dropdown
                    overlay={
                      loginData?.username === msg?.user?.username ? (
                        <div
                          className="ddMenu"
                          onClick={() => {
                            deleteMessage(roomData._id, msg._id, loginData.token);
                          }}
                        >
                          Delete Message <i className="fal fa-trash" aria-hidden="true"></i>
                        </div>
                      ) : (
                        <span></span>
                      )
                    }
                    trigger={["contextMenu"]}
                  >
                    <div className={`msg${loginData?.username === msg?.user?.username ? " me" : ""}`}>
                      <div className="userMsg">{msg?.user?.username}</div>
                      {msg.image && <img src={msg.image} alt="" />}
                      <div className="text">{msg?.text}</div>
                    </div>
                  </Dropdown>
                </Tooltip>
              );
            })
        ) : (
          <span>
            {!activeRoom ? "No room selected." : "No messages yet in this room. Start typing your first message."}
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
                          document.getElementById("inputMsg").value = `${document.getElementById("inputMsg").value}${
                            emoji.character
                          }`;
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
        <div className="uploadWrapper">
          <input
            id="fileIcon"
            type="file"
            multiple
            onChange={async (e) => {
              let AllFiles = [];
              [...e.target.files].map((file) => AllFiles.push(file));
              const results = await Promise.all(
                AllFiles.map(async (file) => {
                  const fileContents = await handleFileChosen(file);
                  return fileContents;
                }),
              );
              setFiles(results);
            }}
          />
          <label htmlFor="fileIcon">
            <i className="fa fa-upload" aria-hidden="true"></i>
          </label>
          {stateFiles.length &&
            stateFiles.map((item, id) => <img key={id} src={item.url} alt="" className="preview" />)}
          {stateFiles.length && (
            <div
              className="fileRemover"
              onClick={() => {
                setFiles([]);
              }}
            >
              {" "}
              <i className="fal fa-times" aria-hidden="true"></i> Remove {stateFiles.length} files
            </div>
          )}
        </div>

        <input
          type="text"
          //value={inputValue}
          id="inputMsg"
          name="msgType"
          autoComplete="off"
          onKeyPress={(e) => {
            if (e.charCode == 13) {
              if (e.target.value.length > 0) {
                setFiles([]);
                submitMsg(roomData._id, e.target.value, loginData?.token, stateFiles);
                e.target.value = "";
              }
            }
          }}
        />
        <i
          className="fad fa-paper-plane"
          onClick={() => {
            const inpElem = document.getElementById("inputMsg");
            if (inpElem.value.length > 0) {
              submitMsg(roomData._id, document.getElementById("inputMsg").value, loginData?.token, stateFiles);
              document.getElementById("inputMsg").value = "";
              setFiles([]);
            }
          }}
        ></i>
      </div>
    </div>
  );
};
