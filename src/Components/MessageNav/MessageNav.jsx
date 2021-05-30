/** @format */

import { Avatar } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
const MessageNav = ({ changeOpen }) => {
  const creds = useSelector((state) => state.chats.creds);
  if (creds) {
    return (
      <div onClick={changeOpen} className="container-messagenav">
        <div className="container-messagenav-pfp">
          <Avatar/>
        </div>
        <div className="container-messagenav-title">
          <p>{ creds.username}</p>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default MessageNav;
