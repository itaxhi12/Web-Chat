/** @format */

import React, { useState, useRef, useEffect } from "react";
import SendIcon from "@material-ui/icons/Send";
import Message from "../Message/Message";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
const MessageList = ({ closeAbout }) => {
  const [text, setText] = useState("");

  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user[0]);
  const creds = useSelector((state) => state.chats.creds);
  const darkmode = useSelector((state) => state.darkmode.darkmode);
  const chat = useSelector((state) => state.chats.currentChat);
  const messages = useSelector((state) => state.messages.messages);

  const socket = useRef(null);

  socket.current = io("http://localhost:8000");

  const sendMessage = (e) => {
    e.preventDefault();
    if (text !== "") {
      socket.current.emit("new message", {
        chatid: chat._id,
        author: user.user.username,
        content: text,
      });
      socket.current.on("newmessage", (message) => {
     console.log(message)
        dispatch({
          type: "NEW MESSAGE",
          data: message,
        });
        setText("");
      });
    }
  };

  useEffect(() => {
    if (chat) {
      socket.current.emit("getmessages", chat._id);
      socket.current.on("messages", (res) => {
        dispatch({ type: "GET MESSAGES", data: res });
      });
    }
  }, [chat, user, dispatch, socket]);
  const renderMessages = () => {
    let i = 0;
    let messageCount = messages.length;
    let tempMessages = [];

    while (i < messageCount) {
      let previous = messages[i - 1];
      let current = messages[i];
      let next = messages[i + 1];
      let isMine = current.author === user.user.username;
      let currentMoment = moment(current.createdAt);
      let prevBySameAuthor = false;
      let nextBySameAuthor = false;
      let startsSequence = true;
      let endsSequence = true;
      let showTimestamp = true;

      if (previous) {
        let previousMoment = moment(previous.createdAt);
        let previousDuration = moment.duration(
          currentMoment.diff(previousMoment)
        );
        prevBySameAuthor = previous.author === current.author;

        if (prevBySameAuthor && previousDuration.as("hours") < 1) {
          startsSequence = false;
        }

        if (previousDuration.as("hours") < 1) {
          showTimestamp = false;
        }
      }

      if (next) {
        let nextMoment = moment(next.createdAt);
        let nextDuration = moment.duration(nextMoment.diff(currentMoment));
        nextBySameAuthor = next.author === current.author;

        if (nextBySameAuthor && nextDuration.as("hours") < 1) {
          endsSequence = false;
        }
      }

      tempMessages.push(
        <Message
          key={i}
          isMine={isMine}
          startsSequence={startsSequence}
          endsSequence={endsSequence}
          showTimestamp={showTimestamp}
          data={current}
        />
      );

      i += 1;
    }

    return tempMessages;
  };

  return (
    <div onClick={closeAbout} className="container-messagelist">
      {creds ? (
        <>
          <div className="container-messagelist-messages">
            {renderMessages()}
          </div>
          <form onSubmit={sendMessage} className="container-messagelist-send">
            <div className="container-messagelist-send">
              <input
                id="text"
                placeholder="Type a message"
                autoComplete="off"
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
              />
              <button type="submit">
                <SendIcon />
              </button>
            </div>
          </form>
        </>
      ) : (
        <div
          style={{
            textAlign: "center",
            width: "100%",
          }}
        >
          <p
            style={{
              color: darkmode ? "white" : "black",
              fontSize: "2em",
              fontWeight: "400",
            }}
          >
            Please Select a chat to start talking
          </p>
        </div>
      )}
    </div>
  );
};

export default MessageList;
