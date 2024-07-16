import "./App.css";
import ChatPage from "./components/ChatPage";

import Home from "./components/home";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="w-full h-screen flex bg bg-gradient-to-r from-indigo-500 text-center justify-center ">
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/ChatPage" element={<ChatPage />} />
      </Routes>
    </div>
  );
}

export default App;
