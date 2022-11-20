import { TextField } from '@mui/material'
import React from 'react'

export default function AccountForm() {
  return (
    <>
        <form method='post'>
            <TextField id="filled-basic1" label="Username" variant="filled" name='username' onChange={() => console.log("it works!")}/>
        </form>
    </>
  )
}
