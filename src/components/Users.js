import { Button } from "@mui/material";
import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const data = async () => {
      onSnapshot(collection(db, "users"), (querySnapshot) => {
        const user = [];
        querySnapshot.forEach((doc) => {
          user.push(doc.data());
        });
        setUsers(user);
      });
    };
    data();
  }, []);

  return (
    <div className="user">
      {users.map(({ userName, photoURL, uid }) => (
        <div className="btn-link" key={uid}>
          <Button variant="outlined">
            <img src={photoURL} alt="" />
            <p>{userName}</p>
          </Button>
          <Button variant="outlined">Roomを追加</Button>
        </div>
      ))}
    </div>
  );
}

export default Users;
