import { Button } from '@mui/material'
import { getAdditionalUserInfo, GoogleAuthProvider, signInWithRedirect} from 'firebase/auth';
import React from 'react'
import { auth, db } from '../firebase';
import GoogleIcon from '@mui/icons-material/Google';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';

function SignIn() {

    function signInWithGoogle() {
        const provider = new GoogleAuthProvider();
        signInWithRedirect(auth, provider)
        .then((result) => {
          const isNewUser = getAdditionalUserInfo(result).isNewUser
          if (isNewUser) {
            makeRooms();
          }
        })
        .catch((err) => alert(err.message));
    };

    async function makeRooms(){
        const user = auth.currentUser;
        const docRef = await addDoc(collection(db, "rooms"), {
            text: `${user.displayName}にメッセージを送る`,
            photoURL: user.photoURL,
            uid:user.uid,
        });
        setDoc(doc(db, "rooms", docRef.id), {
            roomid: docRef.id
        }, { merge : true});
    }

  return (
    <div className='signIn'>
        <h1>Chat App</h1>
        <Button sx={{borderRadius: '20px'}} variant='outlined' onClick={signInWithGoogle}><GoogleIcon fontSize='midium' sx={{marginRight: '5px'}}/>Googleでログインする</Button>
    </div>
  )
}

export default SignIn