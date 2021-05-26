import React, { useState } from "react";
import CloseIcon from "@material-ui/icons/Close";
import CreateIcon from "@material-ui/icons/Create";
import IconButton from "@material-ui/core/IconButton";
import CheckIcon from "@material-ui/icons/Check";
import { useSelector } from "react-redux";
import Avatar from "@material-ui/core/Avatar";

const ChatInfo = ({ isOpen, changeOpen }) => {
  const darkmode = useSelector((state) => state.darkmode.darkmode);
  const [inputDis, SetinputDis] = useState(true);
  const [textDis, setTextDis] = useState(true);
  const [participants] = useState([
    { name: "User1" },
    { name: "User2" },
    { name: "User3" },
    { name: "User4" },
    { name: "User5" },
  ]);
  const changeDisabled = () => {
    SetinputDis(!inputDis);
  };
  const changeDisabledText = () => {
    setTextDis(!textDis);
  };
  const render = (obj, index) => {
    return (
      <div key={index} className="container-chatinfo-participant">
        <div className="container-chatinfo-pariticipant-pfp">
          <Avatar src={null} alt="" />
        </div>
        <div className="container-chatinfo-participant-name">
          <p>{obj.name}</p>
        </div>
      </div>
    );
  };
  return (
    <div
      className={isOpen ? "container-chatinfo active" : "container-chatinfo"}
    >
      <div className="container-chatinfo-header">
        <div className="container-chatinfo-header-cross">
          <CloseIcon onClick={changeOpen} style={{ color: "white" }} />
        </div>
        <p>Group Info</p>
      </div>
      <div className="container-chatinfo-creds">
        <div className="container-chatinfo-creds-pfp">
          <input
            type="image"
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            alt=""
          />
        </div>
        <div className="container-chatinfo-creds-name">
          <p>Group Name</p>
          <div style={{ display: "flex", alignItems: "center" }}>
            <input placeholder="Group Name" disabled={inputDis} />
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
        <div className="container-chatinfo-creds-status">
          <p>Group Description</p>
          <div style={{ display: "flex", alignItems: "center" }}>
            <textarea
              id="status"
              disabled={textDis}
              placeholder="Add group description"
            />{" "}
            {textDis ? (
              <IconButton onClick={changeDisabledText}>
                <CreateIcon
                  style={{
                    color: darkmode ? "#00af9c" : "#2386c8",
                  }}
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
        <div className="container-chatinfo-participants">
          <p className="container-chatinfo-participants-header">Participants</p>
          {participants.map(render)}
        </div>
      </div>
    </div>
  );
};

export default ChatInfo;
