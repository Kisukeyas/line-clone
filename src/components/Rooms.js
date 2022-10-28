import { Button } from "@mui/material";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../firebase";
import Header from "./Header";

function Rooms() {
  const [rooms, setRooms] = useState([]);
  const user = auth.currentUser;

  useEffect(() => {
    const firstUser = auth.currentUser;
    const data = () => {
      const q = query(
        collection(db, "rooms"),
        where("joinedUser", "array-contains", firstUser.uid)
      );
      onSnapshot(
        q,
        (querySnapshot) => {
          const room = [];
          querySnapshot.forEach((doc) => {
            room.push(doc.data());
          });
          setRooms(room);
        },
        (e) => {
          console.log(e);
        }
      );
    };
    data();
  }, []);

  return (
    <div>
      <Header />
      <div className="main">
        {rooms?.map(({ joinedUser, userDisplayName, roomId }) => (
          <div key={roomId}>
            <Link to="/chatspace" state={roomId}>
              {joinedUser[0] === user.uid ? (
                <Button>{userDisplayName[1]}</Button>
              ) : (
                <Button>{userDisplayName[0]}</Button>
              )}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Rooms;
