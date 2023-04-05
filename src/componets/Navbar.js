import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { FiMenu } from 'react-icons/fi'
import { GrClose } from 'react-icons/gr'
import { BsFacebook } from 'react-icons/bs'
import { AiFillTwitterCircle } from 'react-icons/ai'
import { IoLogoWhatsapp } from 'react-icons/io'
import { MdOutlineManageAccounts } from 'react-icons/md'
import { CgProfile } from 'react-icons/cg'
import authservice from './auth.service'

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  const ulRef = useRef(null)
  const chekiRef = useRef(null)

  const myfunction = () => {
    const ischeki = chekiRef.current.checked
    if (ischeki) {
      chekiRef.current.checked = false
    } else {
      chekiRef.current.checked = true
    }
  }

  return (
    <div className='nav-menu'>
      <p className='logo-img'>
        <Link to={'/'} className='link-style'>
          News-Home
        </Link>
      </p>
      <input type='checkbox' id='check' ref={chekiRef} />
      <label htmlFor='check' className='checkbtn'>
        <FiMenu className='icon-style' />
      </label>
      <ul ref={ulRef} id='ul-id'>
        <label htmlFor='check' className='checkbtn'>
          <GrClose className='icon-2-style' />
        </label>
        <li>
          <Link to={'/'} className='link-style' onClick={myfunction}>
            Home
          </Link>
        </li>
        <li>
          <Link to={'/about'} className='link-style' onClick={myfunction}>
            About us
          </Link>
        </li>
        <li>
          <Link to={'/contact-us'} className='link-style' onClick={myfunction}>
            uploads
          </Link>
        </li>
        <li>
          <Link
            id='acc-icon'
            to={'/account'}
            className='link-style'
            onClick={myfunction}
          >
            <MdOutlineManageAccounts />
          </Link>
        </li>
        {user ? (
          <li>
            <Link
              id='acc-icon'
              to={'/profile'}
              className='link-style'
              onClick={myfunction}
            >
              <p className='myprofile'>
                <CgProfile /> manage profile
              </p>
            </Link>
          </li>
        ) : (
          ''
        )}
        {user ? (
          <li>
            <p>Logged in as</p>
            <p>{authservice.getCurrentUser().name}</p>
            <Link onClick={() => authservice.logOut()}>log out</Link>
          </li>
        ) : (
          <Link
            id='acc-icon'
            to={'/account'}
            className='link-style'
            onClick={myfunction}
          >
            log in
          </Link>
        )}

        <div className='menu-footer'>
          <p className='m-footer-par'>we value you as our partner</p>
          <div className='halain'></div>
          <div className='inner-menu-footer'>
            <p>
              <BsFacebook className='m-footer-icons' />
            </p>
            <p>
              <AiFillTwitterCircle className='m-footer-icons' />
            </p>
            <p>
              <IoLogoWhatsapp className='m-footer-icons' />
            </p>
          </div>
        </div>
      </ul>
    </div>
  )
}

export default Navbar
