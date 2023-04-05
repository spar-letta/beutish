import React from 'react'
import './video-react.css'

const Selechafile = ({ url, filetype }) => {
  if (
    filetype === 'image/jpeg' ||
    filetype === 'image/jpg' ||
    filetype === 'image/png'
  ) {
    return (
      <div>
        <img src={url} alt='' />
      </div>
    )
  }

  // if (filetype === 'video/mp4' || filetype === 'video/x-matroska') {
  //   return <Player playsInline src={url} id='player-tu' />
  // }

  return (
    <div>
      <video autoPlay controls loop>
        <source src={url} type='video/mp4' />
      </video>
    </div>
  )
}

export default Selechafile
