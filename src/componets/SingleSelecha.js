import React from 'react'
//import './video-react.css'

const SingleSelecha = ({ url, filetype }) => {
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

  if (
    filetype === 'video/mp4' ||
    filetype === 'video/mkv' ||
    filetype === 'video/x-matroska' ||
    filetype === 'video/webm'
  ) {
    return (
      <video autoPlay controls loop>
        <source src={url} type='video/mp4' />
      </video>
    )
  }

  return (
    <div>
      <p>nothing</p>
    </div>
  )
}

export default SingleSelecha
