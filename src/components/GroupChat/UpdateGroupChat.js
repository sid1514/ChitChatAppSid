import React, { useState } from "react";
import {
  ModalHeader,
 
  ModalContent,
  ModalActions,
  Button,
 
  Modal,
  Icon,
  Input,
} from "semantic-ui-react";
import { ChatState } from "../../context/ChatProvider";
import UserBadgeItem from "./UserBadgeItem";
import axios from "axios";
import UserListItem from "../ChatComponents/UserListItem";
import { ErrorMessage } from "../Authentication/ErrorMessage";
const UpdateGroupChat = ({ fetchAgain, setFetchAgain, fetchMessage }) => {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = useState();
  const [searchResult, setSearchresult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [GrouChatName, setGroupName] = useState("");
  const { user, selectedChat, setselectedChat } = ChatState();
 const [ErrorMsg, setErrormessage] = useState(null);
  const handleRemove = async (user1) => {
    if (selectedChat.groupAdmin._id !== user._id && user1._id !== user._id) {
      alert("your not admin only admins can remove");
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `https://chatappbackend-97qn.onrender.com/api/chat/groupremove`,
        { chatId: selectedChat._id, userId: user1._id },
        config
      );
      user1._id == user._id ? setselectedChat() : setselectedChat(data);
      fetchMessage()
      setFetchAgain(!fetchAgain);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleRename = async () => {
    if (!GrouChatName) {
      console.log("enter field first");
      return;
    }
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.put(
        `https://chatappbackend-97qn.onrender.com/api/chat/rename`,
        {
          chatId: selectedChat._id,
          chatName: GrouChatName,
        },
        config
      );
      setselectedChat(data);
      setFetchAgain(!fetchAgain);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        `https://chatappbackend-97qn.onrender.com/api/user?search=${search}`,
        config
      );
      setLoading(false);
      console.log(data);
      setSearchresult(data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleAddUser = async (user1) => {
    if (selectedChat.users.find((u) => u._id === user1._id)) {
     
      setErrormessage("user already there")
      return;
    }
    if (selectedChat.groupAdmin._id !== user._id) {
    
      setErrormessage("your not admin")

      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `https://chatappbackend-97qn.onrender.com/api/chat/groupadd`,
        { chatId: selectedChat._id, userId: user1._id },
        config
      );
      setselectedChat(data);
      setFetchAgain(!fetchAgain);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="">
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={
          <button className="">
            {" "}
            <Icon name="eye" />{" "}
          </button>
        }
      >
        <ModalHeader>
          <h2 className="text-3xl">{selectedChat.chatName}</h2>
        </ModalHeader>
        <ModalContent image>
          <div className="flex h-1/2 justify-between ">
            <p className="text-black text-2xl font-bold">Members:</p>
            <div className="flex flex-col overflow-y-scroll m-6 w-1/2 h-96">
              {selectedChat.users.map((u) => (
                <UserBadgeItem
                  key={user._id}
                  user={u}
                  handleFunction={() => handleRemove(u)}
                />
              ))}
            </div>
             {ErrorMsg ? <ErrorMessage message={ErrorMsg} /> : null}
            <div className="">
              <Input
                placeholder="chat name"
                value={GrouChatName}
                onChange={(e) => setGroupName(e.target.value)}
                className="border border-black m-2"
              />
              <Button onClick={handleRename} color="black">
                Rename group
              </Button>
            </div>
            <div className="h-1/2">
              <Input
                placeholder="add user"
                onChange={(e) => handleSearch(e.target.value)}
                className="border border-black m-2"
              />

              {loading ? (
                <p>loading...</p>
              ) : (
                searchResult.map((user1) => (
                  <div className="h-max overflow-y-scroll">
                    <UserListItem
                      key={user1._id}
                      user={user1}
                      handleFunction={() => handleAddUser(user1)}
                    />
                  </div>
                ))
              )}
            </div>
          </div>
        </ModalContent>
        <div className="m-4">
          <Button color="red">Leave group</Button>
        </div>
        <ModalActions>
          <Button color="black" onClick={() => setOpen(false)}>
            cancel
          </Button>

          <Button
            content="Save changes"
            labelPosition="right"
            icon="checkmark"
            onClick={() => setOpen(false)}
            positive
          />
        </ModalActions>
      </Modal>
    </div>
  );
};

export default UpdateGroupChat;
