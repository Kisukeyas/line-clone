import { Button } from '@mui/material'
import { GoogleAuthProvider, signInWithRedirect, signOut } from 'firebase/auth';
import React from 'react'
import { auth } from '../firebase';
import GoogleIcon from '@mui/icons-material/Google';

function SignIn() {

    function signInWithGoogle() {
        const provider = new GoogleAuthProvider();
        signInWithRedirect(auth, provider).catch((err) => alert(err.message));
    };

  return (
    <div className='signIn'>
        <h1>Chat App</h1>
        <Button sx={{borderRadius: '20px'}} variant='outlined' onClick={signInWithGoogle}><GoogleIcon fontSize='midium' sx={{marginRight: '5px'}}/>Googleでログインする</Button>
    </div>
  )
}

export default SignIn