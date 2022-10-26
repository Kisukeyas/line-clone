import './App.css';
import SignIn from './components/SignIn';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from './firebase';
import Line from './components/Line';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Room from './components/Room';

function App() {
  const [user] = useAuthState(auth);
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={user ? <Line /> : <SignIn />}/>
      <Route path='room' element={<Room />}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
