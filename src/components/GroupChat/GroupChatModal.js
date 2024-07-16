import React, { useState } from "react";
import {
  ModalDescription,
  ModalActions,
  Button,
  Header,
  Modal,
  Icon,
  ModalContent,
  Input,
} from "semantic-ui-react";
import { ChatState } from "../../context/ChatProvider";
import axios from "axios";
import UserListItem from "../ChatComponents/UserListItem";
import UserBadgeItem from "./UserBadgeItem";

const GroupChatModal = () => {
  const [open, setOpen] = React.useState(false);
  const [GrouChatName, setGroupName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState();
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user, chat, setChats } = ChatState();

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
      setSearchResult(data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      console.log("user already added");
      return;
    }
    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  const handleDelete = (deleteUser) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== deleteUser._id));
  };
  const handleSubmit = async () => {
    if (!selectedUsers || !GrouChatName) {
      alert("please fill the details");
      return;
    }
    console.log(selectedUsers,GrouChatName)
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        "https://chatappbackend-97qn.onrender.com/api/chat/group",
        {
          name: GrouChatName,
          users: JSON.stringify(selectedUsers.map((u) => u._id)),
        },
        config
      );
      setChats([data, ...chat]);
      console.log("new group chat created");
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <button className="NewGroupBt md:text-2 rounded space-x-2 m-4 bg-green-700/75 p-2 text-white">
          <label className="font-bold text-right">New Group</label>
          <Icon name="add" size="large" color="white" />
        </button>
      }
      className="createGroup"
    >
      <ModalDescription className="text-center content-center m-5">
        <Header>Create Group Chat</Header>
      </ModalDescription>
      <ModalContent className="text-left content-center m-5">
        <div className="flex flex-row space-x-2">
          <Input
            placeholder="group chat name"
            type="text"
            onChange={(e) => setGroupName(e.target.value)}
            className="m-2 h-1/2 border border-black"
          />

          <Input
            placeholder="search user"
            type="text"
            onChange={(e) => handleSearch(e.target.value)}
            className="m-2 h-1/2 border border-black"
          />

          <div className=" h-1/3 overflow-y-scroll w-9/12">
            {loading ? (
              <div>loading</div>
            ) : (
              searchResult
                ?.slice(0, 4)
                .map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => handleGroup(user)}
                  />
                ))
            )}
          </div>
        </div>
        <div className="flex flex-box mt-4 border p-2 w-9/12 h-1/4 overflow-y-scroll">
          {selectedUsers.map((u) => (
            <UserBadgeItem
              key={user._id}
              user={u}
              handleFunction={() => handleDelete(u)}
            />
          ))}
        </div>
      </ModalContent>

      <ModalActions>
        <Button color="black" onClick={() => setOpen(false)}>
          cancel
        </Button>
        <Button
          content="Create"
          labelPosition="right"
          icon="checkmark"
          onClick={handleSubmit}
          positive
        />
      </ModalActions>
    </Modal>
  );
};

export default GroupChatModal;
