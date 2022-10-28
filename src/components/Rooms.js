import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
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
        where("joinedUser", "array-contains", firstUser.uid),
        orderBy("updateAt", "desc")
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
    <div className="main">
      <Header />
      <List>
        {rooms?.map(({ joinedUser, userDisplayName, roomId, photoURL }) => (
          <Link
            to="/chatspace"
            state={roomId}
            style={{
              textDecoration: "none",
              color: "black",
            }}
            key={roomId}
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar
                    src={joinedUser[0] === user.uid ? photoURL[1] : photoURL[0]}
                    alt=""
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={`
                    ${
                      joinedUser[0] === user.uid
                        ? userDisplayName[1]
                        : userDisplayName[0]
                    }'s Chat Room
                  `}
                />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );
}

export default Rooms;
