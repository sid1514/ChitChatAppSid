import React from "react";
import { MessageHeader, Message } from "semantic-ui-react";

export const ErrorMessage = ({ message }) => (
  <Message warning >
    <MessageHeader>{message}</MessageHeader>
   
  </Message>
);

export const SuccessMsg = ({ message }) => (
  <Message positive>
    <MessageHeader>{message}</MessageHeader>
  </Message>
);
