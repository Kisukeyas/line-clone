import './App.css';
import SignIn from './components/SignIn';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from './firebase';
import Line from './components/Line';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Users from './components/Users';
import SignOut from './components/SignOut';

function App() {
  const [user] = useAuthState(auth);
  return (

    <BrowserRouter>
    <Routes>
      <Route path="/" element={user ? <Users/> : <SignIn />}/>
      <Route path="line" element={<Line />}/>
    </Routes>
    </BrowserRouter>

  );
}

export default App;
