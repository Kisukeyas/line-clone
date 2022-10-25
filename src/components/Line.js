import { collection, limit, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebase';
import SendMessage from './SendMessage';
import SignOut from './SignOut'


function Line() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const data = async () => {
            const q = query(collection(db, "messages"), orderBy("createdAt"), limit(50));
            onSnapshot(q, (querySnapshot) => {
                const message = [];
                querySnapshot.forEach((doc) => {
                    message.push(doc.data());
                })
                setMessages(message);
            })
        }
        data();
    }, []);
  return (
    <div>
        <SignOut />
        <div className='main'>
            {messages.map(({id, text, photoURL, uid}) => (
                <div className={uid === auth.currentUser.uid? "sent":"received"}>
                    <div className={`msg ${uid === auth.currentUser.uid? "msg-sent":""}`} key={id}>
                        <img src={photoURL}/>
                        <p>{text}</p>
                    </div>
                </div>
            ))}
        </div>
        <SendMessage />
    </div>
  )
}

export default Line