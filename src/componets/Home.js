import React, { useEffect, useState } from 'react'
import { SlLike } from 'react-icons/sl'
import { AiOutlineMessage } from 'react-icons/ai'
import { FiMapPin } from 'react-icons/fi'
import { FcCalendar } from 'react-icons/fc'
import { TfiTimer } from 'react-icons/tfi'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Selechafile from './Selechafile'
import SinglePostPage from './SinglePostPage'
import ExtraPop from './ExtraPop'
import { useSelector, useDispatch } from 'react-redux'
import {
  singlePost,
  openCloseSinglePost,
  getPostItems,
} from '../features/posts/postSlice'
import { URL_LINK_MAIN } from './URLS'
import CommentTime from './CommentTime'

const Home = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {
    post = [],
    isSinglePostOpen,
    isLoading,
  } = useSelector((store) => store.post)
  const user = JSON.parse(localStorage.getItem('user'))
  let i = 0

  useEffect(() => {
    // window.addEventListener('load', videoScroll)
    window.addEventListener('scroll', videoScroll)
  }, [])

  const videoScroll = () => {
    if (document.querySelectorAll('video').length > 0) {
      var windowHeight = window.innerHeight
      var videoEl = document.querySelectorAll('video')

      for (var i = 0; i < videoEl.length; i++) {
        var thisVideoEl = videoEl[i],
          videoHeight = thisVideoEl.clientHeight,
          videoClientRect = thisVideoEl.getBoundingClientRect().top
        if (
          videoClientRect <= windowHeight - videoHeight * 0.5 &&
          videoClientRect >= 0 - videoHeight * 0.5
        ) {
          //thisVideoEl.play()
        } else {
          thisVideoEl.pause()
        }
      }
    }
  }

  const handleLike = (postId) => {
    const update_about = {
      emoji: 'like',
    }
    if (user === null) {
      navigate('/account')
    } else {
      axios
        .post(
          `${URL_LINK_MAIN}/likes_app/save_post_like/${postId}/${user.id}`,
          update_about
        )
        .then((response) => {
          dispatch(getPostItems(postId))
        })
    }
  }

  // useEffect(() => {
  //   window.addEventListener('scroll', (event) => {
  //     if (document.querySelectorAll('video').length > 0) {
  //       var windowHeight = window.innerHeight
  //       var videoEl = document.querySelectorAll('video')

  //       for (var i = 0; i < videoEl.length; i++) {
  //         var thisVideoEl = videoEl[i],
  //           videoHeight = thisVideoEl.clientHeight,
  //           videoClientRect = thisVideoEl.getBoundingClientRect().top
  //         if (
  //           videoClientRect <= windowHeight - videoHeight * 0.5 &&
  //           videoClientRect >= 0 - videoHeight * 0.5
  //         ) {
  //           // thisVideoEl.play()
  //         } else {
  //           thisVideoEl.pause()
  //         }
  //       }
  //     }
  //   })
  // }, [])

  const stop_video = () => {
    if (document.querySelectorAll('video').length > 0) {
      // var windowHeight = window.innerHeight
      var videoEl = document.querySelectorAll('video')

      for (var i = 0; i < videoEl.length; i++) {
        var thisVideoEl = videoEl[i]
        thisVideoEl.pause()
      }
    }
  }

  if (isLoading) {
    return (
      <section className='main-page'>
        <div className='inner-main-page'>
          <h3>loading...</h3>
        </div>
      </section>
    )
  }

  if (post.length === 0) {
    return (
      <section className='main-page'>
        <div className='inner-main-page'>
          <h3>no posts</h3>
        </div>
      </section>
    )
  }
  return (
    <section className='main-page'>
      <div className='inner-main-page'>
        {post.map((post) => {
          return (
            <div className='card-main' key={post.post_id}>
              <div className='col-two'>
                <input type='checkbox' id='check' />
                <div className='header-col'>
                  <div className='userdetails'>
                    <img
                      src={post.user.profile_pic_url}
                      alt=''
                      className='emoji-size'
                    />
                    <div className='head-det'>
                      <p className='username-s-post'>{post.user.username}</p>
                      <p className='about-s-post'>{post.user.about_text}</p>
                    </div>
                  </div>
                  <div className='more-det'>
                    <p className='tyme'>
                      <CommentTime _localtime={post._localtime} />
                    </p>
                    <div>
                      <ExtraPop post_uri={post.url} />
                    </div>
                  </div>
                </div>
                <div className='cont-col'>
                  <Selechafile {...post} />
                </div>
                <div className='footer-col'>
                  <p className='comm-size-move'>
                    <FiMapPin className='icon-spac' />
                    {post.location}
                  </p>
                  <p className='comm-size-move'>
                    <FcCalendar className='icon-spac' />
                    {post.day_period}
                  </p>
                  <p className='comm-size-move'>
                    <TfiTimer className='icon-spac' />
                    {post.time_period}
                  </p>
                </div>
                <div className='footer-col'>
                  <div className='comm-size-move'>
                    <SlLike
                      className='icon-spac'
                      onClick={() => handleLike(post.post_id)}
                    />
                    {post.post_likes_list.length === 0
                      ? ''
                      : post.post_likes_list.length}
                  </div>
                  <p
                    onClick={() => {
                      stop_video()
                      dispatch(singlePost(post))
                      dispatch(openCloseSinglePost(true))
                    }}
                    className='comm-size-move'
                  >
                    <AiOutlineMessage className='icon-spac' />
                    {post.comments_list.length === 0
                      ? ''
                      : post.comments_list.length}
                  </p>
                  {/* <p className='comm-size-move'>
                    <TbEyeCheck className='icon-spac' />
                    41 Views
                  </p> */}
                </div>
              </div>
            </div>
          )
        })}
      </div>
      {isSinglePostOpen && <SinglePostPage />}
    </section>
  )
}

export default Home
