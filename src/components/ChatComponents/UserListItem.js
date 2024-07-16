import React from 'react'
import { ChatState } from '../../context/ChatProvider';

const UserListItem = ({ user,handleFunction }) => {
    
    return (
      <div onClick={handleFunction} className="w-max userList flex md:mb-4 border md:p-2 shadow-lg">
        <div>
          <img src={user.pic} className="rounded-full w-10"/>
        </div>
        <div>
          <div>{user.name}</div>
          <div>{user.email}</div>
        </div>
      </div>
    );
};

export default UserListItem

