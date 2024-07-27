import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import ChatProvider from "./context/ChatProvider";
import "semantic-ui-css/semantic.min.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <GoogleOAuthProvider clientId="412495318560-oio09u8g8gs1rg2r5a0nesk1bd88gblh.apps.googleusercontent.com">
        <ChatProvider>
          <App />
        </ChatProvider>
      </GoogleOAuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
