import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { URL_LINK_MAIN } from './URLS'
const Testing = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    const URL_LINK = `${URL_LINK_MAIN}/post_app/files`
    axios.get(URL_LINK).then((repo) => {
      const fetched_data = repo.data
      setData(fetched_data)
    })
  }, [])
  return (
    <div>
      {data.map((post) => {
        return (
          <div>
            <p>
              Post id {post.post_id} for {post.type} and its a {post.texts}
            </p>
            <video width='320' height='350' autoPlay='true' controls>
              <source src={post.url} type='video/mp4'></source>
            </video>
          </div>
        )
      })}
    </div>
  )
}

export default Testing
