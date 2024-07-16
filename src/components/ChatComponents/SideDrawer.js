import { useEffect, useState } from "react";
import {  Icon } from "semantic-ui-react";
import { ChatState } from "../../context/ChatProvider";
import ProfileModal from "./ProfileModal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ChatLoading from "./ChatLoading";
import UserListItem from "./UserListItem";
const Sidedrawer = () => {
  const [search, setSearch] = useState();
  const [searchResult, setSearchresult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
  const nav = useNavigate();
  
  const [showSearch, setShowSearch] = useState(false);
  const { user, setselectedChat, chat, setChats } = ChatState();
  const [Click, setClick] = useState(false);
  const [userimage, setuserImage] = useState([]);

  const logout = () => {
    localStorage.removeItem("userInfo");
    nav("/");
  };

  const HandleSearch = async () => {
    if (!search) {
      alert("enter a search user");
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
      setSearchresult(data);
      console.log(data);
    } catch (error) {
      alert("enter a correct search");
      setLoading(false);
    }
  };

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(
        "https://chatappbackend-97qn.onrender.com/api/chat",
        { userId },
        config
      );
      if (!chat.find((c) => c._id === data._id)) {
        setChats([data, ...chat]);
      }
      setselectedChat(data);
      setLoadingChat(false);
      setShowSearch(false);
    } catch (error) {
      alert("chat cannot accesible");
    }
  };

  const getuserPic = async () => {
    try {
      const {data} = await axios.get(
        `https://chatappbackend-97qn.onrender.com/api/user/${user._id}/pic`
      );
      //console.log(res);
      
      const imageUrl = URL.createObjectURL(data);
      
      setuserImage(imageUrl);
    } catch (error) {
      console.log(error);
      setuserImage(user.pic)
    }
  };

  useEffect(() => {
    getuserPic();
  }, []);
  return (
    <>
      <div className="">
        <div className="m-2 flex flex-row w-full ">
          <div onClick={() => setClick(!Click)} className="md:w-1/2 h-full">
            <img
              src={userimage}
              alt="user"
              className="userImage md:w-1/2 rounded-full "
              style={{ cursor: "pointer" }}
              onClick={() => setClick(!Click)}
            />
          </div>

          <div className="profileOption font-bold content-center flex flex-col rounded-2xl">
            <button
              className={`w-full border border-black bg-neutral-600/75 text-white p-2 transition-opacity duration-300 ${
                Click ? "opacity-100" : "opacity-0"
              }`}
            >
              <ProfileModal user={user} />
            </button>
            <button
              className={`w-full border border-black bg-neutral-600/75 text-white p-2 transition-opacity duration-300 ${
                Click ? "opacity-100" : "opacity-0"
              }`}
            >
              Setting
            </button>
            <button
              className={`w-full border border-black bg-neutral-600/75 text-white p-2 transition-opacity duration-800 ${
                Click ? "opacity-100" : "opacity-0"
              }`}
              onClick={logout}
            >
              Log out
            </button>
          </div>
        </div>

        <div className="searchUser w-3/2 m-1 md:mt-5" onClick={() => setShowSearch(true)}>
          <input
            type="search"
            placeholder="search"
            className="border rounded p-2 w-5/6 md:w-10/12 mr-2"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Icon name="search" size="large" onClick={HandleSearch} />
        </div>
        <div className="h-full">
          {showSearch ? (
            loading ? (
              <div className=" w-full ">
                <ChatLoading />
              </div>
            ) : (
              <div>
                {searchResult?.map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => accessChat(user._id)}
                  />
                ))}
              </div>
            )
          ) : (
           null
          )}
        </div>
      </div>
    </>
  );
};

export default Sidedrawer;
