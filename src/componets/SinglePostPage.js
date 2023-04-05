import React, { useRef } from 'react'
import { SlLike } from 'react-icons/sl'
import { AiOutlineMessage } from 'react-icons/ai'
import { FiMapPin } from 'react-icons/fi'
import { FcCalendar } from 'react-icons/fc'
import { TfiTimer } from 'react-icons/tfi'
import { RiSendPlane2Fill } from 'react-icons/ri'
import { TiArrowBack } from 'react-icons/ti'
import { flushSync } from 'react-dom'
import axios from 'axios'
import './singlepost.css'
import { useState } from 'react'
import ChildSinglePost from './ChildSinglePost'
import { TiMessage } from 'react-icons/ti'
import ExtraPop from './ExtraPop'
import SingleSelecha from './SingleSelecha'
import authService from './auth.service'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { openCloseSinglePost, getSinglePost } from '../features/posts/postSlice'
import { URL_LINK_MAIN } from './URLS'
import CommentTime from './CommentTime'
import { useNavigate } from 'react-router-dom'
const SinglePostPage = () => {
  const { singlePost = {} } = useSelector((state) => state.post)
  const dispatch = useDispatch()
  let navigate = useNavigate()
  const user = authService.getCurrentUser()
  const [comments, setComments] = useState(singlePost.comments_list)
  const [childOpen, setChildOpen] = useState(false)
  const [commentId, setCommentId] = useState()
  const [comment_text, setComment_Text] = useState('')
  const listRef = useRef(null)

  const handleReply = (comment_id) => {
    setCommentId(comment_id)
    setChildOpen(!childOpen)
  }
  const closeChild = () => {
    setChildOpen(false)
  }

  const handleLike = () => {
    const update_about = {
      emoji: 'like',
    }
    if (user === null) {
      navigate('/account')
    } else {
      axios
        .post(
          `${URL_LINK_MAIN}/likes_app/save_post_like/${singlePost.post_id}/${user.id}`,
          update_about
        )
        .then((response) => {
          dispatch(getSinglePost(singlePost.post_id))
        })
    }
  }

  const handleCommentLike = (comment_id) => {
    const update_about = {
      emoji: 'like',
    }
    if (user === null) {
      navigate('/account')
    } else {
      axios
        .post(
          `${URL_LINK_MAIN}/likes_app/save_comment_like/${comment_id}/${user.id}`,
          update_about
        )
        .then((response) => {
          dispatch(getSinglePost(singlePost.post_id))
        })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (user === null) {
      navigate('/account')
    } else {
      const url_submit = `${URL_LINK_MAIN}/comment_app/save_comment/${singlePost.post_id}/${user.id}`
      axios
        .post(url_submit, { comment_body: comment_text })
        .then((response) => {
          flushSync(() => {
            const myData = response.data
            setComments([...comments, myData])
          })
          setComment_Text('')
          listRef.current?.lastElementChild?.scrollIntoView()
        })
    }
  }

  return (
    <section className='main-page-single'>
      <div className='div-scroll'>
        <div className='header-bars'>
          <button
            onClick={() => {
              dispatch(openCloseSinglePost(false))
            }}
            className='back-aaro-btn'
          >
            <TiArrowBack />
          </button>
          Put your header
        </div>
        <div className='scroll-par'>
          {/* place your post here */}
          <div className='header-col'>
            <div className='userdetails'>
              <img
                src={singlePost.user.profile_pic_url}
                alt=''
                className='emoji-size'
              />
              <div className='head-det'>
                <p className='username-s-post'>{singlePost.user.username}</p>
                <p className='about-s-post'>{singlePost.user.about_text}</p>
              </div>
            </div>
            <div className='more-det'>
              <p className='tyme'>
                <CommentTime _localtime={singlePost._localtime} />
              </p>
              <div>
                <ExtraPop post_uri={singlePost.url} />
              </div>
            </div>
          </div>
          <div className='cont-col'>
            <SingleSelecha {...singlePost} />
          </div>
          <p className='aln-descrp'>{singlePost.texts}</p>
          <div className='footer-col'>
            <p className='comm-size-move'>
              <FiMapPin className='icon-spac' />
              {singlePost.location}
            </p>
            <p className='comm-size-move'>
              <FcCalendar className='icon-spac' />
              {singlePost.day_period}
            </p>
            <p className='comm-size-move'>
              <TfiTimer className='icon-spac' />
              {singlePost.time_period}
            </p>
          </div>
          <div className='footer-col'>
            <p className='comm-size-move' onClick={handleLike}>
              <SlLike className='icon-spac' />
              {singlePost.post_likes_list.length === 0
                ? ''
                : singlePost.post_likes_list.length}
            </p>
            <p className='comm-size-move'>
              <AiOutlineMessage className='icon-spac' />
              {singlePost.comments_list.length === 0
                ? ''
                : singlePost.comments_list.length}
            </p>
          </div>
          <p>comments</p>
          <div className='lainic'></div>
          <div className='comments-section' ref={listRef}>
            {singlePost.comments_list.map((comm) => {
              return (
                <div className='commsec' key={comm.comment_id}>
                  <div className='emo-div'>
                    <p className='picemoji'>
                      <img
                        src={comm.user.profile_pic_url}
                        alt=''
                        className='emoji-size-small'
                      />
                    </p>
                  </div>
                  <div className='innercommsec'>
                    <div className='combinedcomp'>
                      <div className='comment-username'>
                        <p className='name-usern'>{comm.user.username}</p>
                        <p>{comm.comment_body}</p>
                      </div>
                      <div className='likesandrepl'>
                        <p>
                          <CommentTime _localtime={comm._localtime} />
                        </p>
                        <p
                          className='likecom'
                          onClick={() => handleCommentLike(comm.comment_id)}
                        >
                          like
                        </p>
                        <p className='likecom'>
                          {comm.comment_likes_list.length === 0
                            ? ''
                            : comm.comment_likes_list.length}
                        </p>

                        <p
                          onClick={() => handleReply(comm.comment_id)}
                          className='messg-number'
                        >
                          <TiMessage className='msg-icon' />
                          {comm.child_comments_list.length === 0
                            ? ''
                            : comm.child_comments_list.length}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          {/* place your post here */}
          <p>-------------</p>
        </div>
      </div>
      <form action='' className='single-post-footer'>
        <div className='text-btn'>
          <textarea
            type='text'
            rows='2'
            cols='50'
            placeholder='write a comment'
            className='foot-input-it'
            value={comment_text}
            onChange={(e) => setComment_Text(e.target.value)}
          />
          <button onClick={handleSubmit} className='sent-arrow-btn'>
            <RiSendPlane2Fill className='sent-arrow' />
          </button>
        </div>
      </form>

      {childOpen && (
        <ChildSinglePost commentId={commentId} closeChild={closeChild} />
      )}
    </section>
  )
  // }

  return (
    <section className='main-page-single'>
      <p>Something went wrong</p>
    </section>
  )
}

export default SinglePostPage
