import React, { useState } from 'react'
import './extrapop.css'
import { IconButton, Snackbar } from '@mui/material'
import { BiDotsHorizontal } from 'react-icons/bi'
const ExtraPop = ({ post_uri }) => {
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    setOpen(true)
    navigator.clipboard.writeText(post_uri.toString())
  }
  return (
    <div>
      <div className='dropdown'>
        <button className='dropbtn'>
          <BiDotsHorizontal />
        </button>
        <div className='dropdown-content'>
          <a href='#' onClick={handleClick}>
            copy url
          </a>
          <a href='#'>share</a>
        </div>
        <Snackbar
          message='Copied to clibboard'
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          autoHideDuration={2000}
          onClose={() => setOpen(false)}
          open={open}
        />
      </div>
    </div>
  )
}

export default ExtraPop
