import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { auth, db } from "../firebase";
import Header from "./Header";
import SendMessage from "./SendMessage";

function ChatSpace() {
  const [messages, setMessages] = useState([]);
  const { state } = useLocation();

  useEffect(() => {
    const data = () => {
      const q = query(
        collection(db, "messages"),
        where("roomId", "==", state),
        orderBy("createdAt")
      );
      onSnapshot(
        q,
        (querySnapshot) => {
          const message = [];
          querySnapshot.forEach((doc) => {
            message.push(doc.data());
          });
          setMessages(message);
        },
        (e) => {
          console.log(e);
        }
      );
    };
    data();
  }, [state]);
  return (
    <div>
      <Header />
      <div className="main">
        {messages.map(({ docId, text, photoURL, uid }) => (
          <div
            className={uid === auth.currentUser.uid ? "sent" : "received"}
            key={docId}
          >
            <div
              className={`msg ${
                uid === auth.currentUser.uid ? "msg-sent" : ""
              }`}
            >
              <img src={photoURL} alt="" />
              <p>{text}</p>
            </div>
          </div>
        ))}
      </div>
      <SendMessage state={state} />
    </div>
  );
}

export default ChatSpace;
