import { Button } from '@mui/material'
import { GoogleAuthProvider, signInWithRedirect, signOut } from 'firebase/auth';
import React from 'react'
import { auth } from '../firebase';

function SignIn() {

    function signInWithGoogle() {
        const provider = new GoogleAuthProvider();
        signInWithRedirect(auth, provider).catch((err) => alert(err.message));
    };

  return (
    <div>
        <Button onClick={signInWithGoogle}>Googleでログインする</Button>
    </div>
  )
}

export default SignIn