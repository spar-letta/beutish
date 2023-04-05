import React, { useState } from 'react'
import './contactus.css'
import { TfiVideoClapper } from 'react-icons/tfi'
import axios from 'axios'
import { URL_LINK_MAIN } from './URLS'
import authservice from './auth.service'
import { useNavigate } from 'react-router-dom'
const ContactUs = () => {
  const navigate = useNavigate()
  const user = authservice.getCurrentUser()
  const [source, setSource] = useState()
  const [file, setFile] = useState()
  const [text, setText] = useState('')
  const [location, setLocation] = useState('Location')
  const [time, setTime] = useState('7am-6pm')
  const [day, setDays] = useState('Mon-Fri')

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    const url = URL.createObjectURL(file)
    setFile(file)
    setSource(url)
  }

  const handleLike = (e) => {
    if (user === null) {
      navigate('/account')
    } else {
      e.preventDefault()
      let formData = new FormData()
      formData.append('file', file)
      formData.append('text', text)
      axios
        .post(
          `${URL_LINK_MAIN}/post_app/create_new_post/${location}/${day}/${time}/${user.id}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        )
        .then((response) => {
          alert(response.data)
          navigate('/')
        })
    }
  }

  const handleChoose = () => {
    setSource('')
  }

  return (
    <div className='sec-div'>
      <p>about page</p>
      <p>about page</p>
      <div className='VideoInput'>
        {source && <video className='VideoInput_video' controls src={source} />}
        <label htmlFor='file-in-field' className='label-video'>
          <TfiVideoClapper />
          <p>choose file</p>
        </label>
        <input
          className='VideoInput_input'
          type='file'
          onChange={handleFileChange}
          accept='.mov,.mp4,.mkv'
          id='file-in-field'
        />
        {source && <button onClick={handleChoose}>clear</button>}
      </div>
      {/* <div className='VideoInput_footer'>{source || 'Nothing selectd'}</div> */}
      <form className='form-data-fm'>
        <h4>fill the form</h4>
        <div className='arrange-fields'>
          <label htmlFor='description'>description</label>
          <textarea
            name='description'
            id='description'
            cols='40'
            rows='10'
            placeholder='Brief description'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className='arrange-fields'>
          <label htmlFor='location'>location</label>
          <input
            type='text'
            id='location'
            placeholder='Githurai 44'
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className='arrange-fields'>
          <label htmlFor='time'>time range</label>
          <input
            type='text'
            id='time'
            placeholder='7am-6pm'
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
        <div className='arrange-fields'>
          <label htmlFor='days'>week range</label>
          <input
            type='text'
            id='days'
            placeholder='Mon-Fri'
            value={day}
            onChange={(e) => setDays(e.target.value)}
          />
        </div>
        <button onClick={handleLike}>save</button>
      </form>
    </div>
  )
}

export default ContactUs
