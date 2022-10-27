import React from 'react'
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { Button } from '@mui/material'

function SignOut() {
  return (
    <header>
        <h3 className='header-item'>
            {auth.currentUser.displayName}
          </h3>
          <Button color="inherit" onClick={() => signOut(auth)} style={{padding: "0 40px"}} >ログアウト</Button>


    </header>
  )
}

export default SignOut