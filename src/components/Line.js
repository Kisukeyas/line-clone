import { collection, limit, onSnapshot, query, where} from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebase';
import SendMessage from './SendMessage';
import SignOut from './SignOut'


function Line() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const data = async () => {
            const q = query(collection(db, "messages"), limit(50));
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
            {messages.map(({docId, text, photoURL, uid}) => (
                <div className={uid === auth.currentUser.uid? "sent":"received"} key={docId}>
                    <div className={`msg ${uid === auth.currentUser.uid? "msg-sent":""}`}>
                        <img src={photoURL} alt=''/>
                        <p>{text}</p>
                    </div>
                </div>
            ))}
        </div>
        <SendMessage/>
    </div>
  )
}

export default Line