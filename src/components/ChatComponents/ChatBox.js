import React from 'react'
import { ChatState } from '../../context/ChatProvider';
import SingleChat from './SingleChat';

const ChatBox = ({ fetchAgain, setfetchAgain }) => {
  //const { selectedChat } = ChatState();
  return (
    <div className="w-full h-full justify-center ">
      <SingleChat fetchAgain={fetchAgain} setfetchAgain={setfetchAgain} />
    </div>
  );
};

export default ChatBox;
