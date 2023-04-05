import React, { useState, useEffect, useRef } from 'react'
import { TiArrowBack } from 'react-icons/ti'
import { RiSendPlane2Fill } from 'react-icons/ri'
import { BiLike } from 'react-icons/bi'
import authService from './auth.service'
import { flushSync } from 'react-dom'
import axios from 'axios'
import { RiDeleteBinLine } from 'react-icons/ri'
import './singlepost.css'
import { URL_LINK_MAIN } from './URLS'
import CommentTime from './CommentTime'
import { getSinglePost } from '../features/posts/postSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const ChildSinglePost = ({ commentId, closeChild }) => {
  const { singlePost = {} } = useSelector((state) => state.post)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = authService.getCurrentUser()
  const [singleComment, setSingleComment] = useState([])
  const [childComment, setChildComment] = useState([])
  const [txt_area, setTxt_area] = useState('')
  const [txt_area2, setTxt_area2] = useState('')
  const listRef = useRef(null)
  const focusInput = useRef(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const url_link = `${URL_LINK_MAIN}/comment_app/fetch_comment_by_id/${commentId}`
    axios.get(url_link).then((response) => {
      setSingleComment(response.data)
      setChildComment(response.data.child_comments_list)
      setLoading(false)
    })
  }, [])

  const handleFocus = () => {
    focusInput.current.focus()
  }

  const replychildcomm = (id, body) => {
    setTxt_area2(`${body}`)
    focusInput.current.focus()
  }

  const handleClear = () => {
    setTxt_area2('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (user === null) {
      navigate('/account')
    } else {
      const url_submit = `${URL_LINK_MAIN}/comment_app/save_comment_child/${commentId}/${user.id}`
      axios
        .post(url_submit, { comment_body: txt_area, repliedto: txt_area2 })
        .then((response) => {
          flushSync(() => {
            setChildComment([...childComment, response.data])
          })
          listRef.current?.lastElementChild?.scrollIntoView()
          setTxt_area('')
          setTxt_area2('')
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

  if (loading) {
    return (
      <section className='main-page-single'>
        <p>loading...</p>
      </section>
    )
  }
  if (loading === false) {
    return (
      <section className='main-page-single'>
        <div className='div-scroll'>
          <div className='header-bars'>
            <button onClick={() => closeChild()} className='back-aaro-btn'>
              <TiArrowBack />
            </button>
            this the header
          </div>
          {/* =================== */}
          <div className='comments-section-comment'>
            <div className='commsec'>
              <div className='emo-div'>
                <p className='picemoji'>
                  <img src={singleComment.user.profile_pic_url} alt='' />
                </p>
              </div>
              <div className='innercommsec'>
                <div className='combinedcomp'>
                  <div className='comment-username'>
                    <p className='name-usern'>{singleComment.user.username}</p>
                    <p>{singleComment.comment_body}</p>
                  </div>
                  <div className='likesandrepl'>
                    <p>
                      <CommentTime _localtime={singleComment._localtime} />
                    </p>
                    <p className='likecom'>like</p>
                    <p onClick={() => handleFocus(singleComment.comment_id)}>
                      reply
                    </p>
                    <BiLike className='likecom' />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* ==========END========== */}
          {/* --------------CHILD COMMENTS----------- */}
          <div className='comments-section-child' ref={listRef}>
            {childComment.map((comm) => {
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
                        <div>
                          {comm.repliedto !== '' ? (
                            <p className='compress-reply'>{comm.repliedto}</p>
                          ) : (
                            ''
                          )}
                          <p className='name-usern'>{comm.user.username}</p>
                          <p>{comm.comment_body}</p>
                        </div>
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
                        {comm.comment_likes_list.length === 0
                          ? ''
                          : comm.comment_likes_list.length}
                        <p
                          onClick={() =>
                            replychildcomm(comm.comment_id, comm.comment_body)
                          }
                        >
                          reply
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          {/* -----------------END------------------- */}
        </div>
        <div className='plus-reply'>
          <form action='' className='single-post-footer'>
            {txt_area2 === '' ? (
              ''
            ) : (
              <div className='replied-txt-wrapper'>
                <div className='align-reply-x'>
                  <p className='rply-bold'>Replying to</p>
                  <RiDeleteBinLine className='x-remove' onClick={handleClear} />
                </div>
                <p className='txt-reply-to'>{txt_area2}</p>
              </div>
            )}

            <div className='text-btn'>
              <textarea
                type='text'
                rows='2'
                cols='50'
                placeholder='write a comment'
                className='foot-input-it'
                ref={focusInput}
                id='txtarea'
                value={txt_area}
                onChange={(e) => setTxt_area(e.target.value)}
              />
              <button onClick={handleSubmit} className='sent-arrow-btn'>
                <RiSendPlane2Fill className='sent-arrow' />
              </button>
            </div>
          </form>
        </div>
      </section>
    )
  }
  return (
    <div>
      <p>one two three</p>
    </div>
  )
}

export default ChildSinglePost
