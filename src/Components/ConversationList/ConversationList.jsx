/** @format */

import React from "react";
import Avatar from "@material-ui/core/Avatar";
const ConversationList = () => {
  const data = [
    { id: 1, name: "Test1" },
    { id: 2, name: "Test2" },
    { id: 3, name: "Test3" },
    { id: 4, name: "Test4" },
    { id: 5, name: "Test5" },
    { id: 6, name: "Test6" },
    { id: 7, name: "Test7" },
    { id: 8, name: "Test8" },
    { id: 9, name: "Test9" },
    { id: 10, name: "Test10" },
    { id: 11, name: "Test11" },
  ];

  const render = (e) => {
    return (
      <div key={e.id} className="container-convlist-convs-items">
        <div className="container-convlist-convs-items-pfp">
          <Avatar src={null} alt="" />
        </div>
        <div className="container-convlist-convs-items-name">
          <p>{e.name}</p>
        </div>
      </div>
    );
  };
  return (
    <div className="container-convlist">
      <div className="container-convlist-search">
        <input placeholder="Search or Start a new chat" />
      </div>  
      <div className="container-convlist-convs">
        {data.map(render)}
      </div>
    </div>
  );
};

export default ConversationList;