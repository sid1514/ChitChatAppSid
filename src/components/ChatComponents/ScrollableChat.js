import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import { isLastMessage, isSameSender } from "../../config/ChatLogics";
import { ChatState } from "../../context/ChatProvider";

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();
  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => (
          <div className="flex" key={m._id}>
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <img
                src={m.sender.pic}
                alt={m.sender.name}
                className="w-10 h-10 md:w-14 md:h-14 rounded-full"
              />
            )}
            <span
              className={`Messages p-1 m-2 w-fit h-max md:text-xl ${
                m.sender._id === user._id
                  ? `marginLeft bg-teal-600 text-white md:ml-96 `
                  : ` bg-white text-black md:mr-36`
              } p-1 md:p-3 rounded text-black`}
            >
              {m.content}
            </span>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
