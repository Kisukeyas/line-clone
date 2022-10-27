import { Button } from '@mui/material'
import { getAdditionalUserInfo, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React from 'react'
import { auth, db } from '../firebase';
import GoogleIcon from '@mui/icons-material/Google';
import { addDoc, collection, } from 'firebase/firestore';

function SignIn() {

    function signInWithGoogle() {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
        .then((result) => {
          const isNewUser = getAdditionalUserInfo(result).isNewUser
          if (isNewUser) {
            makeUsers();
          }
        })
        .catch((err) => alert(err.message));
    };

    async function makeUsers(){
        const user = auth.currentUser;
        await addDoc(collection(db, "users"), {
            userName: user.displayName,
            photoURL: user.photoURL,
            uid:user.uid,
        });
    }

  return (
    <div className='signIn'>
        <h1>Chat App</h1>
        <Button sx={{borderRadius: '20px'}} variant='outlined' onClick={signInWithGoogle}><GoogleIcon fontSize='midium' sx={{marginRight: '5px'}}/>Googleでログインする</Button>
    </div>
  )
}

export default SignIn