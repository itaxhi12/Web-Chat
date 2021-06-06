import React, { useState, useEffect } from "react";
import axios from "axios";
import Avatar from "@material-ui/core/Avatar";
import { useDispatch, useSelector } from "react-redux";
const Conversation = ({ convo, jwt, id }) => {
  const [creds, setCreds] = useState({});
  const [style, setStyle] = useState({});
  const dispatch = useDispatch();
  const currentChat = useSelector((state) => state.chats.currentChat);
  const darkmode = useSelector((state) => state.darkmode.darkmode);
  const setChat = () => {
    dispatch({ type: "SETCURRENT", data: convo });
    dispatch({ type: "SETCREDS", data: creds });
  };

  useEffect(() => {
    const getData = async () => {
      await axios
        .get(`http://localhost:4000/user/${id}`, {
          headers: { Authorization: jwt },
        })
        .then((res) => {
          setCreds(res.data);
        })
        .catch((err) => console.log(err));
    };
    getData();
    if (currentChat) {
      if (currentChat._id === convo._id) {
        setStyle({ backgroundColor: darkmode ? "#323739" : "#ededed" });
      } else {
        setStyle({});
      }
    }
  }, [setCreds, id, darkmode, jwt, currentChat, convo, setStyle]);

  return (
    <div
      onClick={setChat}
      className="container-convlist-convs-items"
      style={style}
    >
      <div className="container-convlist-convs-items-pfp">
        <Avatar src={creds.pfp?`http://localhost:4000/${creds.pfp}`:null} alt="" />
      </div>
      <div className="container-convlist-convs-items-name">
        <p>{creds.username}</p>
      </div>
    </div>
  );
};

export default Conversation;
