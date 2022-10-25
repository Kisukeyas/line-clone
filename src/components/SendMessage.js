import { Button, Input } from '@mui/material';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import React, { useState } from 'react';
import { auth, db } from '../firebase';
import SendIcon from '@mui/icons-material/Send';

function SendMessage() {
    const [message, setMessage] = useState("");
    const user = auth.currentUser;

    async function sendMessage(e){
        e.preventDefault();
        await addDoc(collection(db, "messages"), {
            text: message,
            photoURL: user.photoURL,
            uid:user.uid,
            createdAt: serverTimestamp(),
        });
        setMessage('');
    }
  return (
    <div>
            <div className='sendMsg'>
            <Input style={{
              width: "78%",
              fontSize: "15px",
              fontWeight: "550",
              marginLeft: "5px",
              marginBottom: "-3px",
            }}
            placeholder='メッセージを入力して下さい' type='text' onChange={(e) => setMessage(e.target.value)} value={message}/>
            <Button><SendIcon onClick={sendMessage}/></Button>
            </div>
    </div>
  )
}

export default SendMessage