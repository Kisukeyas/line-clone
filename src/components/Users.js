import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getCountFromServer,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../firebase";
import Header from "./Header";

function Users() {
  const [users, setUsers] = useState([]);
  const user = auth.currentUser;

  useEffect(() => {
    const data = () => {
      onSnapshot(
        collection(db, "users"),
        (querySnapshot) => {
          const user = [];
          querySnapshot.forEach((doc) => {
            user.push(doc.data());
          });
          setUsers(user);
        },
        (e) => {
          console.log(e);
        }
      );
    };
    data();
  }, []);

  async function addRooms(sentUserUid, userName, photoURL) {
    const docRef = await addDoc(collection(db, "rooms"), {
      joinedUser: arrayUnion(user.uid, sentUserUid),
      userDisplayName: arrayUnion(user.displayName, userName),
      photoURL: arrayUnion(user.photoURL, photoURL),
      updateAt: serverTimestamp(),
      usersQuery: { [sentUserUid]: true, [user.uid]: true },
    });
    setDoc(
      doc(db, "rooms", docRef.id),
      {
        roomId: docRef.id,
      },
      { merge: true }
    );
  }
  async function checkIsRoom(sentUserUid) {
    const q = query(
      collection(db, "rooms"),
      where(`usersQuery.${user.uid}`, "==", true),
      where(`usersQuery.${sentUserUid}`, "==", true)
    );
    const checkServer = await getCountFromServer(q);
    const count = checkServer.data().count;
    return count;
  }

  async function goToRoom(sentUserUid, userName, photoURL) {
    const countRooms = await checkIsRoom(sentUserUid);
    if (!countRooms) {
      addRooms(sentUserUid, userName, photoURL);
    }
  }

  return (
    <div className="main">
      <Header />
      <List>
        {users.map(({ userName, photoURL, uid }) => (
          <Link
            to="/rooms"
            style={{
              textDecoration: "none",
              color: "black",
            }}
            key={uid}
          >
            <ListItem disablePadding>
              <ListItemButton onClick={() => goToRoom(uid, userName, photoURL)}>
                <ListItemAvatar>
                  <Avatar src={photoURL} alt="" />
                </ListItemAvatar>
                <ListItemText
                  primary={`${user.uid === uid ? "自分" : userName}`}
                />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );
}

export default Users;
