import { Button } from "@mui/material";
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

  async function addRooms(sentUserUid, userName) {
    const docRef = await addDoc(collection(db, "rooms"), {
      joinedUser: arrayUnion(user.uid, sentUserUid),
      userDisplayName: arrayUnion(user.displayName, userName),
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

  async function goToRoom(sentUserUid, userName) {
    const countRooms = await checkIsRoom(sentUserUid);
    if (!countRooms) {
      addRooms(sentUserUid, userName);
    }
  }

  return (
    <div className="user">
      <Header />
      {users.map(({ userName, photoURL, uid, count }) => (
        <div className="btn-link" key={uid}>
          <Button variant="outlined">
            <img src={photoURL} alt="" />
            {user.uid === uid ? <p>自分</p> : <p>{userName}</p>}
            <p>{count}</p>
          </Button>
          <Button variant="outlined" onClick={() => goToRoom(uid, userName)}>
            Roomに移動
          </Button>
        </div>
      ))}
    </div>
  );
}

export default Users;
