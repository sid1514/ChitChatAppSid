import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorMessage, SuccessMsg } from "./ErrorMessage";

const SignUp = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [profilePic, setProfile] = useState("");
  const [password, setPassword] = useState();
  const [confirmPass, setconfirmPass] = useState();
  //const [loading, setloading] = useState(false);
  const [ErrorMsg, setErrormessage] = useState(null);
  const [successMsg, setSuccesmsg] = useState(null);
  const nav = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    if (profilePic) {
      formData.append("userPic", profilePic);
    }

    try {
      const response = await axios.post(
        "https://chatappbackend-97qn.onrender.com/api/user/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("User registered successfully:", response.data);
      if (response.data) {
        setSuccesmsg("user created successfully proceed to signin");
      }
    } catch (error) {
      console.error("Error registering user:", error.response.data);
      setErrormessage("Error registering user, fill required fields");
    }
  };
  return (
    <div className="text-center justify-center p-5 align-center h-10/12 font-bold">
      {ErrorMsg ? <ErrorMessage message={ErrorMsg} /> : null}
      {successMsg?<SuccessMsg message={successMsg}/>:null}
      <form onSubmit={submitHandler}>
        <div className="flex flex-col gap-4 h-1/2">
          <input
            placeholder="enter name "
            type="text"
            className="border p-3 "
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
          <input
            placeholder="enter email "
            type="email"
            className="border p-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <input
            placeholder="enter password "
            type="password"
            className="border p-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <input
            placeholder="confirm password "
            type="password"
            className="border p-3"
            onChange={(e) => setconfirmPass(e.target.value)}
          ></input>
          <label>Profile Picture:</label>
          <input type="file" onChange={(e) => setProfile(e.target.files[0])} />
        </div>
        <button
          className="py-3 px-2 border md:w-1/4 mt-4 bg-teal-300 shadow-lg mt-10 font-bold"
          onClick={submitHandler}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
