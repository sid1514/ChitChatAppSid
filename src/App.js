import "./App.css";
import ChatPage from "./components/Chatpage";

import Home from "./components/home";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="w-full h-screen flex bg bg-gradient-to-r from-indigo-500 text-center justify-center ">
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/Chatpage" element={<ChatPage />} exact/>
      </Routes>
    </div>
  );
}

export default App;
