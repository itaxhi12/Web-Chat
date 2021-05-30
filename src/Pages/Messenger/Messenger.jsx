import React, { useEffect, useState } from "react";
import ConversationList from "../../Components/ConversationList/ConversationList";
import Navbar from "../../Components/Navbar/Navbar";
import MessageList from "../../Components/MessageList/MessageList";
import MessageNav from "../../Components/MessageNav/MessageNav";
import Profile from "../../Components/ProfileSidebar/Profile";
import Changepass from "../../Components/ChangePassSidebar/Changepass";
import ChatInfo from "../../Components/ChatInfo/ChatInfo";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
const Messenger = () => {
  const user = useSelector((state) => state.auth.user[0]);
  const dispatch = useDispatch();
  const [isOpen, setOpen] = useState(false);
  const [changePass, setChangePass] = useState(false);
  const [chatdisc, setChatdisc] = useState(false);
  useEffect(() => {
    axios
      .get(`http://localhost:4000/groups/${user.user.id}`, {
        headers: { Authorization: user.jwt },
      })
      .then((res) => {
        dispatch({ type: "GETCHATS", data: res.data });
      })
      .catch((err) => console.log(err));
  }, [user, dispatch]);

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
      setChatdisc(!chatdisc);
    }
  };
  return (
    <>
      <div className="container-messenger">
        <div>
          <Navbar changeopen={changeopen} changePass={changePassToggle} />
          <div className="container-messenger-sidebar">
            <ConversationList user={user} />
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
      <Changepass
        username={user.user.username}
        isOpen={changePass}
        changeOpen={changePassToggle}
      />
      <ChatInfo isOpen={chatdisc} changeOpen={changeChatdisc} />
    </>
  );
};

export default Messenger;