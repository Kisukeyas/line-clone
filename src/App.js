import "./App.css";
import SignIn from "./components/SignIn";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Users from "./components/Users";
import Rooms from "./components/Rooms";
import ChatSpace from "./components/ChatSpace";

function App() {
  const [user] = useAuthState(auth);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user ? <Users /> : <SignIn />} />
        <Route path="rooms" element={user ? <Rooms /> : <SignIn />} />
        <Route path="chatspace" element={user ? <ChatSpace /> : <SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
