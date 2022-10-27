import { Button, Input } from '@mui/material';
import { addDoc, collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { auth, db } from '../firebase';
import SendIcon from '@mui/icons-material/Send';


function SendMessage({ state }) {
    const [message, setMessage] = useState("");
    const user = auth.currentUser;

    async function sendMessage(e){
        e.preventDefault();
        const docRef = await addDoc(collection(db, "messages"), {
            text: message,
            photoURL: user.photoURL,
            uid:user.uid,
            createdAt: serverTimestamp(),
            ToMessage: state.sentUid,
            roomid: state.roomid,
        });
        setDoc(doc(db, "messages", docRef.id), {
          docId: docRef.id
      }, { merge : true});
        setMessage('');
    }
  return (
    <div>
            <form className='sendMsg' onSubmit={sendMessage}>
            <Input style={{
              width: "78%",
              fontSize: "15px",
              fontWeight: "550",
              marginLeft: "5px",
              marginBottom: "-3px",
            }}
            placeholder='メッセージを入力して下さい' type='text' onChange={(e) => setMessage(e.target.value)} value={message}/>
            <Button><SendIcon onClick={sendMessage}/></Button>
            </form>
    </div>
  )
}

export default SendMessage