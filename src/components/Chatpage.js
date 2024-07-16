import React, { useState } from "react";

import { ChatState } from "../context/ChatProvider";
import Sidedrawer from "./ChatComponents/SideDrawer";
import MyChats from "./ChatComponents/MyChats";
import ChatBox from "./ChatComponents/ChatBox";
import { Icon } from "semantic-ui-react";
const ChatPage = () => {
  const { user } = ChatState();
  const [fetchAgain, setfetchAgain] = useState(false);
  const [drawerFlag, setDrawerFlag] = useState(false);
  return (
    <div className="shadow-lg m-10 flex rounded-2xl w-lvw p-2 bg-transparent">
      <div
        className={`${
          !drawerFlag ? "sideDrawer" : null
        } md:w-1/3 border-r-4 rounded p-3 bg-gradient-to-l from-green-400 to-blue-500 hover:from-green-300 hover:to-blue-600 `}
      >
        <div className=" ">{user && <Sidedrawer />}</div>
        <div>{user && <MyChats fetchAgain={fetchAgain} />}</div>
      </div>
      <button
        className="sideDrawerbutton"
        onClick={() => setDrawerFlag(!drawerFlag)}
      >
        {" "}
        <Icon name="chevron right" size="big" />
      </button>
      <div className="w-full h-full">
        {user && (
          <ChatBox fetchAgain={fetchAgain} setfetchAgain={setfetchAgain} />
        )}
      </div>
    </div>
  );
};

export default ChatPage;
