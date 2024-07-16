import { createContext, useContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
const ChatContext = createContext();
const ChatProvider = ({ children }) => {
  const [user, setUser] = useState()
  const [selectedChat, setselectedChat] = useState()
  const [chat, setChats] = useState()

    const nav=useNavigate()
    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"))  
        setUser(userInfo)
        if (!userInfo) {
            nav("/")
        }
    },[])
    return (
      <>
        <ChatContext.Provider
          value={{
            selectedChat,
            setselectedChat,
            user,
            setUser,
            chat,
            setChats,
          }}
        >
          {children}
        </ChatContext.Provider>
      </>
    );
};
export const ChatState = () => {
  return useContext(ChatContext);
};
export default ChatProvider;
