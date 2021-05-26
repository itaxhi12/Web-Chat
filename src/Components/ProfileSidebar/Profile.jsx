/** @format */

import { ArrowBack } from "@material-ui/icons";
import React, { useState } from "react";
import CreateIcon from "@material-ui/icons/Create";
import IconButton from "@material-ui/core/IconButton";
import CheckIcon from "@material-ui/icons/Check";
import { useSelector } from "react-redux";
const Profile = ({ isOpen, changeOpen }) => {
  const darkmode = useSelector((state) => state.darkmode.darkmode);
  const [inputDis, SetinputDis] = useState(true);
  const [textDis, setTextDis] = useState(true);
  const changeDisabled = () => {
    SetinputDis(!inputDis);
  };
  const changeDisabledText = () => {
    setTextDis(!textDis);
  };
  return (
    <div className={isOpen ? "container-profile active" : "container-profile"}>
      <div className="container-profile-header">
        <div className="container-chatinfo-header-cross">
          <ArrowBack onClick={changeOpen} style={{ color: "white" }} />
        </div>
        <p>Profile</p>
      </div>
      <div className="container-profile-creds">
        <div className="container-profile-creds-pfp">
          <input
            type="image"
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            alt=""
          />
        </div>
        <div className="container-profile-creds-name">
          <p>Your Name</p>
          <div style={{ display: "flex", alignItems: "center" }}>
            <input placeholder="Your Name" disabled={inputDis} />
            {inputDis ? (
              <IconButton onClick={changeDisabled}>
                <CreateIcon
                  style={{ color: darkmode ? "#00af9c" : "#2386c8" }}
                />
              </IconButton>
            ) : (
              <IconButton onClick={changeDisabled}>
                <CheckIcon
                  style={{
                    color: darkmode ? "#00af9c" : "#2386c8",
                    fontWeight: 500,
                    fontSize: "larger",
                  }}
                />
              </IconButton>
            )}
          </div>
        </div>
        <div className="container-profile-creds-status">
          <p>About</p>
          <div style={{ display: "flex", alignItems: "center" }}>
            <textarea id="status" disabled={textDis} />{" "}
            {textDis ? (
              <IconButton onClick={changeDisabledText}>
                <CreateIcon
                  style={{ color: darkmode ? "#00af9c" : "#2386c8" }}
                />
              </IconButton>
            ) : (
              <IconButton onClick={changeDisabledText}>
                <CheckIcon
                  style={{
                    color: darkmode ? "#00af9c" : "#2386c8",
                    fontWeight: 500,
                    fontSize: "larger",
                  }}
                />
              </IconButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
