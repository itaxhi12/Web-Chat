/** @format */

import React from "react";
import moment from "moment";

const Message = (props) => {
  const { data, isMine, startsSequence, endsSequence, showTimestamp } = props;

  const friendlyTimestamp = moment(data.timestamp).format("LLLL");
  return (
    <div
      className={[
        "message",
        `${isMine ? "mine" : ""}`,
        `${startsSequence ? "start" : ""}`,
        `${endsSequence ? "end" : ""}`,
      ].join(" ")}>
      {showTimestamp && <div className="timestamp">{friendlyTimestamp}</div>}

      <div className="bubble-container">
        <div className="bubble" title={friendlyTimestamp}>
          {!isMine && <h4>{data.author}:</h4>}
          {data.message}
        </div>
      </div>
    </div>
  );
};

export default Message;
