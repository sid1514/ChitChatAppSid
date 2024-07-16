import React, { useEffect, useState } from "react";

import {

  ModalDescription,
  ModalContent,
  ModalActions,
  Button,
  Header,
  Image,
  Modal,
  Icon,
} from "semantic-ui-react";

const ProfileModal = ({ user }) => {
  const [open, setOpen] = React.useState(false);
  const [loggedUser, setloggedUser] = useState([]);

  useEffect(() => {
    setloggedUser(JSON.parse(localStorage.getItem("userInfo")));
  }, []);
  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<button className="underline">Profile </button>}
    >
      <ModalContent image>
        <Image src={user.pic} alt={user.name} className="w-1/3 h-1/3" />

        {loggedUser.name == user.name ? (
            <Icon name="edit" size="large" />
        ) : null}
        <ModalDescription className="text-center content-center">
          <Header>
            <h2 className="md:text-6xl">{user.name}</h2>
          </Header>

          <p className="md:text-3xl">{user.email}</p>
        </ModalDescription>
      </ModalContent>
      <ModalActions>
        <Button color="black" onClick={() => setOpen(false)}>
          cancel
        </Button>
        {loggedUser.name == user.name ? (
          <Button
            content="Save changes"
            labelPosition="right"
            icon="checkmark"
            onClick={() => setOpen(false)}
            positive
          />):null}
        
      </ModalActions>
    </Modal>
  );
};

export default ProfileModal;
