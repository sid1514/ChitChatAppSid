import { useEffect, useState } from "react";
import { ChatState } from "../../context/ChatProvider";
import axios from "axios";

import ChatLoading from "./ChatLoading";
import { getSender } from "../../config/ChatLogics";
import GroupChatModal from "../GroupChat/GroupChatModal";

const MyChats = ({ fetchAgain }) => {
  const { user, setselectedChat, chat, setChats, selectedChat } = ChatState();
  const [loggedUser, setloggedUser] = useState();
  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        "https://chatappbackend-97qn.onrender.com/api/chat",
        config
      );
      //console.log(data);
      setChats(data);
    } catch (error) {
      console.log("unable to fetch Messages");
    }
  };

  useEffect(() => {
    setloggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, [fetchAgain]);
  return (
    <>
      <div className="w-full h-full">
        <div className="text-right">
          <GroupChatModal />
        </div>

        <div className="flex flex-col h-full">
          {chat ? (
            <div className="overflow-y-auto md:h-96">
              {chat.map((chat) => (
                <div
                  onClick={() => setselectedChat(chat)}
                  cursor="pointer"
                  className={
                    selectedChat === chat
                      ? " text-white bg-neutral-500 rounded m-2"
                      : "rounded border text-black m-2 shadow-lg"
                  }
                  key={chat._id}
                >
                  <p className="chats bg-neutral-800/25 text-white p-1 md:p-3 hover:bg-neutral-800/75">
                    {!chat.isGroupChat
                      ? getSender(loggedUser, chat.users)
                      : chat.chatName}
                    {chat.latestMessage && (
                      <p>
                        <b>{chat.latestMessage.sender.name} : </b>
                        {chat.latestMessage.content.length > 50
                          ? chat.latestMessage.content.substring(0, 51) + "..."
                          : chat.latestMessage.content}
                      </p>
                    )}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <ChatLoading />
          )}
        </div>
      </div>
    </>
  );
};

export default MyChats;
