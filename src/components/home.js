import React, { useState } from "react";
import SignUp from "./Authentication/Signup";
import SignIn from "./Authentication/Signin";
const Home = () => {
  const [switchFlag, setSwitchFlag] = useState(true)
  
  
  return (
    <div className="w-min m-20 justify-center h-full">
      <div className="w-8/12 mb-10">
        <h1 className="md:text-5xl font-bold w-lvw ">Chit-Chat</h1>
      </div>
      <div className="shadow-lg rounded p-10 justify-center w-5/6 md:w-1/2 h-fit bg-white m-auto h-fit">
        <div className="flex">
          <div
            className={`md:text-2xl w-2/3 md:w-1/2 ${
              switchFlag ? `bg-purple-300/25 text-black` : `bg-blue-500`
            } p-3 rounded text-black`}
            onClick={() => setSwitchFlag(!switchFlag)}
          >
            Sign In
          </div>
          <div
            className={`md:text-2xl w-2/3 md:w-1/2 ${
              switchFlag == false
                ? `bg-purple-300/25 text-black`
                : `bg-blue-500 text-white`
            } p-3 rounded`}
            onClick={() => setSwitchFlag(!switchFlag)}
          >
            Sign Up
          </div>
        </div>

        <div className=" m-5 h-10/12">
          {switchFlag ? <SignUp /> : <SignIn />}
        </div>
      </div>
    </div>
  );
};

export default Home;
