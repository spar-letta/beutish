import React, { useState } from 'react'
import axios from 'axios'
import imagex from '../images/emoji2.jpeg'
import styled from 'styled-components'
import { FaGreaterThan } from 'react-icons/fa'
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import authservice from './auth.service'
import { useNavigate } from 'react-router-dom'
import './accounts.css'
import { URL_LINK_MAIN } from './URLS'

const Account = () => {
  let navigate = useNavigate()
  const types = ['Sign In', 'Sign Up']
  const [pwd, setPwd] = useState('')
  const [active, setActive] = useState(types[0])
  const [isRevealPwd, setIsRevealPwd] = useState(false)
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [mesfeedbck, setMesFeedBck] = useState('')

  const handleSave = () => {
    const signupDetails = {
      username: userName,
      email: email,
      role: ['user'],
      password: pwd,
    }
    axios
      .post(`${URL_LINK_MAIN}/beauty/auth/signup`, signupDetails)
      .then((response) => {
        if (response.data.message === 'registered successfully!') {
          setActive(types[0])
          setMesFeedBck(response.data.message)
        } else {
          console.log('error')
        }
      })
  }

  const handleSignIn = (e) => {
    e.preventDefault()
    const signinDetails = {
      username: userName,
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
          <img src={imagex} alt='' className='emoji-person' />
          <p className='emoji-p'>{active}</p>
          <p className='feedbck-msg'>{mesfeedbck}</p>
        </div>
        {/* ------------tabs---------- */}
        <ButtonGroup>
          {types.map((type) => (
            <Tab
              key={type}
              active={active === type}
              onClick={() => setActive(type)}
            >
              {type}
            </Tab>
          ))}
        </ButtonGroup>
        {active === 'Sign In' ? (
          <div>
            <p className='crt-acc'>log in</p>
            <form>
              <input
                type='text'
                name='userName'
                value={userName}
                placeholder='username'
                className='acc-input'
                onChange={(e) => setUserName(e.target.value)}
              />
              <div className='pwd-container'>
                <input
                  name='pwd'
                  placeholder='password'
                  type={isRevealPwd ? 'text' : 'password'}
                  value={pwd}
                  onChange={(e) => setPwd(e.target.value)}
                  className='acc-input'
                />
                <p onClick={() => setIsRevealPwd((prevState) => !prevState)}>
                  {isRevealPwd ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                </p>
              </div>
            </form>
          </div>
        ) : (
          <div>
            <p className='crt-acc'>create account</p>
            <form>
              <input
                type='text'
                name='userName'
                value={userName}
                placeholder='username'
                className='acc-input'
                onChange={(e) => setUserName(e.target.value)}
              />
              <input
                type='text'
                name='email'
                value={email}
                placeholder='email'
                className='acc-input'
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className='pwd-container'>
                <input
                  name='pwd'
                  placeholder='password'
                  type={isRevealPwd ? 'text' : 'password'}
                  value={pwd}
                  onChange={(e) => setPwd(e.target.value)}
                  className='acc-input'
                />
                <p onClick={() => setIsRevealPwd((prevState) => !prevState)}>
                  {isRevealPwd ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                </p>
              </div>
            </form>
          </div>
        )}
        {active === 'Sign In' ? (
          <p className='acc-par'>Don't remember your password ?</p>
        ) : (
          <p className='acc-par'>
            By signing up, you agree to our terms of service and privacy policy.
          </p>
        )}
        {active === 'Sign In' ? (
          <button className='signin-btn' onClick={handleSignIn}>
            <p>{active}</p>
            <span>
              <FaGreaterThan />
            </span>
          </button>
        ) : (
          <button className='signin-btn' onClick={handleSave}>
            <p>{active}</p>
            <span>
              <FaGreaterThan />
            </span>
          </button>
        )}
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
export default Account
