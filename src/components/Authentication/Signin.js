import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorMessage } from "./ErrorMessage";
import Loading from "../../Loader";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
const SignIn = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [hideFlag, setHideFlage] = useState(false);
  const nav = useNavigate();
  const [ErrorMsg, setErrormessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleSignIn = async () => {
    if (!email && !password) {
      setErrormessage("enter field email and password");
      return;
    }
    try {
      setLoading("true");
      const { data } = await axios.post(
        `https://chatappbackend-97qn.onrender.com/api/user/login`,
        {
          email: email,
          password: password,
        }
      );

      localStorage.setItem("userInfo", JSON.stringify(data));

      setLoading(false);
      nav("/chats");
    } catch (e) {
      console.log(e);
      setErrormessage("enter correct email and password");
    }
  };
  const LoginAsGuest = async () => {
    try {
      setLoading("true");
      const { data } = await axios.post(
        `https://chatappbackend-97qn.onrender.com/api/user/login`,
        {
          email: "guest@gmail.com",
          password: "guest",
        }
      );

      localStorage.setItem("userInfo", JSON.stringify(data));

      setLoading(false);
      nav("/chats");
    } catch (e) {
      console.log(e);
      setLoading(false);
      setErrormessage("enter correct email and password");
    }
  };

  const GoogleSignin = async (credentialResponse) => {
    console.log("signin");
    const userData = jwtDecode(credentialResponse.credential);
    const Email = userData.email;
    console.log(userData);
    try {
      setLoading("true");
      const { data } = await axios.post(
        "https://chatappbackend-97qn.onrender.com/api/user/login/googleauth",
        { email: Email } // Send the token to the backend
      );

      nav("/chats");
      localStorage.setItem("userInfo", JSON.stringify(data));
        setLoading(false);
    } catch (error) {
      console.error("Error login user:", error.response);
      setErrormessage("unauthorized user signup with google first ");
    }
  };

  return (
    <div className=" text-center justify-center p-5 align-center font-bold">
      {ErrorMsg ? <ErrorMessage message={ErrorMsg} /> : null}
      {loading ? <Loading /> : null}
      <div className="flex flex-col gap-4 md:text-xl">
        <label>Email Address</label>
        <div>
          <input
            placeholder="enter email "
            type="email"
            className="border p-3 md:w-1/2"
            required={true}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>

        <label>Password</label>
        <div>
          <input
            placeholder="enter password "
            type={!hideFlag ? "password" : "text"}
            className="border p-3 md:w-1/2 md:ml-10"
            required={true}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <label onClick={() => setHideFlage(!hideFlag)} className="ml-2">
            show
          </label>
        </div>
      </div>
      <div className="mt-4">
        <button
          className="py-3 border px-5 md:w-1/4 mt-4 bg-teal-300 shadow-lg"
          onClick={handleSignIn}
        >
          Sign In
        </button>
        <button
          className="py-3 border px-5 md:w-1/4 mt-4 bg-teal-300 shadow-lg"
          onClick={LoginAsGuest}
        >
          Guest Login
        </button>
      </div>
      <div className="mt-4 flex justify-center ">
        <GoogleLogin
          onSuccess={GoogleSignin}
          onError={() => {
            console.log("Login Failed");
          }}
          auto_select={false}
          className="shadow-lg"
        />
      </div>
    </div>
  );
};

export default SignIn;
