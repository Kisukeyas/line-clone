import { collection, limit, onSnapshot, orderBy, query, where} from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { auth, db } from '../firebase';
import SendMessage from './SendMessage';
import SignOut from './SignOut'


function Line() {
    const [messages, setMessages] = useState([]);
    const { state } = useLocation();
    const user = auth.currentUser;

    useEffect(() => {
        const data = async () => {
            const q = query(collection(db, "messages"), limit(50), where("roomid", "==", state.roomid));
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
        <SendMessage state={ state }/>
    </div>
  )
}

export default Line