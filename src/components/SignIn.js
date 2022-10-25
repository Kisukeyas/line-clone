import { Button } from '@mui/material'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React from 'react'
import { auth } from '../firebase';

function SignIn() {

    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider);
    };
  return (
    <div>
        <Button onClick={signInWithGoogle()}>Googleでログインする</Button>
    </div>
  )
}

export default SignIn