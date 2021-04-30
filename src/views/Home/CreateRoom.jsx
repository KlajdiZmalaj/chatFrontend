import React from "react";

export default ({ createRoom, getRooms, formData, setFormData, loginData }) => {
  return (
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
        <span>Room Type : </span>{" "}
        <i
          onClick={(e) => {
            setFormData({ ...formData, isPrivate: true });
          }}
          className={"fal fa-lock" + (formData.isPrivate ? " active" : "")}
          aria-hidden="true"
        ></i>
        <i
          onClick={(e) => {
            setFormData({ ...formData, isPrivate: false });
          }}
          className={
            "fal fa-lock-open" + (!formData.isPrivate ? " active" : "")
          }
        ></i>
      </div>
      {formData.isPrivate && (
        <div className="popUpForm--field">
          <span>Room Passcode : </span>{" "}
          <input
            type="password"
            readOnly
            onClick={(e) => (e.target.readOnly = false)}
            placeholder="***"
            value={formData.password}
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value });
            }}
          />
        </div>
      )}

      <div className="popUpForm--field">
        <button
          onClick={() => {
            createRoom(
              formData.name,
              formData.img,
              formData.desc,
              loginData.token,
              formData.isPrivate,
              formData.password,
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
  );
};
