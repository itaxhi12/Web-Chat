/** @format */

import { Avatar } from "@material-ui/core";
import React from "react";

const MessageNav = ({changeOpen}) => {
  return (
    <div onClick={changeOpen} className="container-messagenav">
      <div className="container-messagenav-pfp">
        <Avatar />
      </div>
      <div className="container-messagenav-title">
        <p>TestGroup</p>
      </div>
    </div>
  );
};

export default MessageNav;
