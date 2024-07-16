import React from "react";
import { Icon } from "semantic-ui-react";

const UserBadgeItem = ({ user, handleFunction }) => {
    return (
      <div
        onClick={handleFunction}
        className="p-2 bg-teal-300 rounded-2xl w-max m-2 text-center text-xl "
      >
        {user.name}
        <Icon name="close" className="p-2 m-2 " onClick={handleFunction} />
      </div>
    );
};

export default UserBadgeItem;
