/** @format */

import React, { useState } from "react";
import ConversationList from "../../Components/ConversationList/ConversationList";
import Navbar from "../../Components/Navbar/Navbar";
import MessageList from "../../Components/MessageList/MessageList";
import MessageNav from "../../Components/MessageNav/MessageNav";
import Profile from "../../Components/ProfileSidebar/Profile";
import Changepass from "../../Components/ChangePassSidebar/Changepass";
import ChatInfo from "../../Components/ChatInfo/ChatInfo";
import {useSelector} from 'react-redux'
const Messenger = () => {
  const username = useSelector((state) => state.auth.user[0].user.username);
  const [isOpen, setOpen] = useState(false);
  const [changePass, setChangePass] = useState(false);
  const [chatdisc, setChatdisc] = useState(false);
  const changeopen = () => {
    setOpen(!isOpen);
  };
  const changeChatdisc = () => {
    setChatdisc(!chatdisc);
  };
  const changePassToggle = () => {
    setChangePass(!changePass);
  };
  const closeAbout = () => {
    if (chatdisc) {
      setChatdisc(!chatdisc)
    }
  }
  return (
    <>
      <div className="container-messenger">
        <div>
          <Navbar changeopen={changeopen} changePass={changePassToggle} />
          <div className="container-messenger-sidebar">
            <ConversationList />
          </div>
        </div>
        <div>
          <MessageNav changeOpen={changeChatdisc} />

          <div className="container-messenger-content">
            <MessageList closeAbout={closeAbout} />
          </div>
        </div>
      </div>
      <Profile isOpen={isOpen} changeOpen={changeopen} />
      <Changepass username={username} isOpen={changePass} changeOpen={changePassToggle} />
      <ChatInfo isOpen={chatdisc} changeOpen={changeChatdisc} />
    </>
  );
};

export default Messenger;
