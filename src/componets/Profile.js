import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import authservice from './auth.service'
import { useNavigate } from 'react-router-dom'
import { BsPen } from 'react-icons/bs'
import { GrCheckmark } from 'react-icons/gr'
import ImageInput from './ImageProf/ImageInput'
import Default_User_Pic from './ImageProf/defaultUserPic.svg'
import authService from './auth.service'
import axios from 'axios'
import './accounts.css'
import { URL_LINK_MAIN } from './URLS'

const Profile = () => {
  const user = authService.getCurrentUser()
  let navigate = useNavigate()
  const [pwd, setPwd] = useState('')
  const [username, setUserName] = useState('')
  const [about, setAbout] = useState('')
  const [isEdit, setIsEdit] = useState(false)
  const [isEditAbout, setIsEditAbout] = useState(false)
  const [image, setImage] = useState('')

  useEffect(() => {
    const URL_LINK = `${URL_LINK_MAIN}/post_app_user/fetch_single_user/${user.id}`
    axios.get(URL_LINK).then((response) => {
      setAbout(response.data.about_text)
      setUserName(response.data.username)
    })
  }, [])

  const handleUpdateUsername = () => {
    const update_username = {
      username: username,
    }
    axios
      .put(
        `${URL_LINK_MAIN}/post_app_user/update_username/${user.id}`,
        update_username
      )
      .then((response) => {})
  }

  const handleSave = () => {
    const update_about = {
      about_text: about,
    }
    axios
      .put(
        `${URL_LINK_MAIN}/post_app_user/update_about_text/${user.id}`,
        update_about
      )
      .then((response) => {})
  }
  const handleEnableEdit = () => {
    const val = document.getElementById('input-custo-1')
    val.disabled = false
    setIsEdit(true)
    val.focus()
  }

  const handleDisenableEdit = () => {
    const val = document.getElementById('input-custo-1')
    val.disabled = true
    setIsEdit(false)
  }

  const handleEnableEditAbout = () => {
    const val = document.getElementById('input-custo-2')
    val.disabled = false
    setIsEditAbout(true)
    val.focus()
  }

  const handleDisenableEditAbout = () => {
    const val = document.getElementById('input-custo-2')
    val.disabled = true
    setIsEditAbout(false)
  }

  const handleSignIn = (e) => {
    e.preventDefault()
    const signinDetails = {
      username: username,
      password: pwd,
    }
    authservice
      .login(signinDetails.username, signinDetails.password)
      .then(() => {
        navigate('/')
        window.location.reload()
        setUserName('')
        setPwd('')
      })
      .catch((error) => {
        var errResp = error.response
        if (errResp === undefined) {
        } else if (errResp.status === 401) {
          setUserName('')
          setPwd('')
        }
      })
  }

  return (
    <section className='account-page'>
      <div className='inner-account'>
        <div className='acc-image'>
          <Link to='/'>
            <HiOutlineArrowNarrowLeft className='back-arr' />
          </Link>
          <div className='col image-input'>
            <ImageInput
              imageData={image.photo?.src}
              defaultPic={Default_User_Pic}
              type='admin'
              name='photo'
              label='Add Photo'
              showPreview
              onChange={(files) => setImage(files, 'admin')}
            />
          </div>
        </div>
        <div>
          <form className='arrange-4m'>
            <p>Username</p>
            <input
              type='text'
              name='userName'
              value={username}
              placeholder='username'
              className='acc-input'
              id='input-custo-1'
              onChange={(e) => setUserName(e.target.value)}
              maxLength='30'
              disabled
            />
            <div className='pen-wrire'>
              {isEdit === false && (
                <p onClick={handleEnableEdit}>
                  <BsPen />
                </p>
              )}
              {isEdit === true && (
                <p onClick={handleDisenableEdit}>
                  <GrCheckmark onClick={handleUpdateUsername} />
                </p>
              )}
            </div>
          </form>
          <form className='arrange-4m'>
            <p>About</p>
            <input
              type='text'
              name='about'
              value={about}
              placeholder='about'
              className='acc-input'
              id='input-custo-2'
              maxLength='32'
              onChange={(e) => setAbout(e.target.value)}
            />
            <div className='pen-wrire'>
              {isEditAbout === false && (
                <p onClick={handleEnableEditAbout}>
                  <BsPen />
                </p>
              )}
              {isEditAbout === true && (
                <p onClick={handleDisenableEditAbout}>
                  <GrCheckmark onClick={handleSave} />
                </p>
              )}
            </div>
          </form>
        </div>

        {/* -----end---------- */}
      </div>
    </section>
  )
}

const Tab = styled.button`
  width: 50%;
  font-size: 14px;
  padding: 10px 20px;
  cursor: pointer;
  opacity: 0.6;
  background: white;
  border: 0;
  outline: 0;
  ${({ active }) =>
    active &&
    `
    border-bottom: 2px solid black;
    opacity: 1;
  `}
`
const ButtonGroup = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
`
export default Profile
