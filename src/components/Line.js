import { Button } from '@mui/material'
import React from 'react'
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

function Line() {
  return (
    <div>
        <Button onClick={() => signOut(auth)}>
            サインアウト
        </Button>
    </div>
  )
}

export default Line