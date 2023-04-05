import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { URL_LINK_MAIN } from './URLS'

const CommentTime = ({ _localtime }) => {
  const [local_time_string, setLocal_time_string] = useState()
  useEffect(() => {
    if (_localtime !== undefined) {
      const URL_LINK = `${URL_LINK_MAIN}/post_app/local_time_str/${_localtime}`
      axios.get(URL_LINK).then((response) => {
        setLocal_time_string(response.data)
      })
    }
  }, [_localtime])

  return <span className='txt-reply-to'>{local_time_string}</span>
}

export default CommentTime
