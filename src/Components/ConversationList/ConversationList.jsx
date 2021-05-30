/** @format */

import React from "react";
import { useSelector } from "react-redux";
import Conversation from "../Conversation/Conversation";
const ConversationList = ({ user }) => {
  const chats = useSelector((state) => state.chats.chats);

  const render = (e, index) => {
    return <Conversation convo={e} key={index} jwt={user.jwt} id={e.participants[0]} />;
  };
  return (
    <div className="container-convlist">
      <div className="container-convlist-search">
        <input placeholder="Search or Start a new chat" />
      </div>
      <div className="container-convlist-convs">{chats.map(render)}</div>
    </div>
  );
};

export default ConversationList;
