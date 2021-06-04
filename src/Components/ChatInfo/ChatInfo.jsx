import React from "react";
import CloseIcon from "@material-ui/icons/Close";
import { useSelector } from "react-redux";
// import Avatar from "@material-ui/core/Avatar";

const ChatInfo = ({ isOpen, changeOpen }) => {
  const creds = useSelector((state) => state.chats.creds);
  // const render = (obj, index) => {
  //   return (
  //     <div key={index} className="container-chatinfo-participant">
  //       <div className="container-chatinfo-pariticipant-pfp">
  //         <Avatar src={null} alt="" />
  //       </div>
  //       <div className="container-chatinfo-participant-name">
  //         <p>{obj.name}</p>
  //       </div>
  //     </div>
  //   );
  // };
  if (creds) {
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
            <p> Name</p>
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                placeholder="Group Name"
                defaultValue={creds.name}
                disabled={true}
              />
            </div>
          </div>
          <div className="container-chatinfo-creds-status">
            <p>Status</p>
            <div style={{ display: "flex", alignItems: "center" }}>
              <textarea
                id="status"
                disabled={true}
                placeholder="Add group description"
                defaultValue={creds.status}
              />{" "}
            </div>
          </div>
          <div className="container-chatinfo-participants">
            {/* <p className="container-chatinfo-participants-header">Participants</p> */}
            {/* {participants.map(render)} */}
          </div>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default ChatInfo;
