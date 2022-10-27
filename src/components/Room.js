import { Button } from '@mui/material';
import { collection, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { db } from '../firebase';

function Room() {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const data = async () => {
            onSnapshot(collection(db, "rooms"), (querySnapshot) => {
                const room = [];
                querySnapshot.forEach((doc) => {
                    room.push(doc.data());
                })
                setRooms(room);
            })

        }
        data();
    }, []);

  return (
    <div className='room'>
        {rooms.map(({roomid, text, photoURL, uid }) => (
                <div className='btn-link' key={roomid}>
                    <Link to={`/line`} state={ {roomid: roomid,sentUid: uid} }>
                    <Button variant='outlined'>
                        <img src={photoURL} alt=''/>
                        <p>{text}</p>
                    </Button>
                    </Link>
                </div>
            ))}
    </div>
  )
}

export default Room