import React, { useEffect, useState } from "react";
import { ChatState } from "../../context/ChatProvider";
import { getSender, getSenderFull } from "../../config/ChatLogics";
import ProfileModal from "./ProfileModal";
import UpdateGroupChat from "../GroupChat/UpdateGroupChat";
import { Input } from "semantic-ui-react";
import axios from "axios";
import ScrollableChat from "./ScrollableChat";
import { io } from "socket.io-client";
import ChatLoading from "./ChatLoading";


const ENDPOINT = "http://localhost:5000";
var socket, selectedChatCompare;
const SingleChat = ({ fetchAgain, setfetchAgain }) => {
  const { user, selectedChat, setselectedChat } = ChatState();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnection, setSocketConnect] = useState(false);
  const [typing, setTyping] = useState(false);
  const [Istyping, setIsTyping] = useState(false);
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnect(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, []);


  const fetchMessage = async () => {
    if (!selectedChat) return;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      setLoading(true);
      const { data } = await axios.get(
        `https://chatappbackend-97qn.onrender.com/api/message/${selectedChat._id}`,
        config
      );
      setMessages(data);
      console.log(messages);
      setLoading(false);
      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      console.log(error);
    }
  };
  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      socket.emit('stop typing',selectedChat._id)
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.post(
          "https://chatappbackend-97qn.onrender.com/api/message",
          { content: newMessage, chatId: selectedChat._id },
          config
        );
        socket.emit("new message", data);
        setMessages([...messages, data]);
        setNewMessage(" ");
      } catch (error) {
        setNewMessage(" ");
        console.log(error);
      }
    }
  };
  useEffect(() => {
    fetchMessage();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);
  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
    if (!socketConnection) return;
    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime
      
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id)
        setTyping(false)
      }
    }, timerLength);
  };

  return (
    <div className="bg-neutral-300 h-full w-full">
      {selectedChat ? (
        <div className="w-full text-xl md:text-2xl justify-between h-full">
          {!selectedChat.isGroupChat ? (
            <div className="w-full ">
              <div className="flex p-6 bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-300 hover:to-blue-600">
                <div className="w-full text-white font-bold rounded p-2">
                  {getSender(user, selectedChat.users)}
                </div>
                <div className=" right-10 p-1">
                  <ProfileModal
                    user={getSenderFull(user, selectedChat.users)}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-between p-10 bg-blue-800 rounded text-white ">
              {selectedChat.chatName.toUpperCase()}
              {
                <UpdateGroupChat
                  fetchAgain={fetchAgain}
                  setFetchAgain={setfetchAgain}
                  fetchMessage={fetchMessage}
                />
              }
            </div>
          )}
          <div className="p-5 w-full h-full flex flex-col">
            {loading ? (
              <div className="w-full">
                <ChatLoading/>
                </div>
            ) : (
              <div className="messages md:h-5/6 md:max-h-96">
                <ScrollableChat messages={messages} />
              </div>
            )}
            <div className="absolute bottom-36">

              {Istyping ? <div>typing...</div> : null}
            </div>
            <div className="TypeMsg w-full mt-28" onKeyDown={sendMessage}>
              <Input
                placeholder="type you are messages"
                type="text"
                onChange={typingHandler}
                className="md:w-11/12 my-1"
              />
              <button className="px-2 text-[16px]" onClick={sendMessage}><img src="send.jpg" alt="" className="rounded-full w-10 h-10"/></button>
            </div>
          </div>
        </div>
      ) : (
        <div className="font-bold text-white text-xl text-center h-full bg-gradient-to-r from-cyan-600/25 to-blue-800/25 md:text-3xl content-center h-full">
          No chat selected
        </div>
      )}
    </div>
  );
};

export default SingleChat;
