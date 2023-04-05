import { useState, useEffect } from 'react'
import { URL_LINK_MAIN } from './URLS'
const URL_LINK = `${URL_LINK_MAIN}/post_app/fetch_list_of_posts`

export const useFetch = () => {
  const [posts, setPosts] = useState([])

  const getPosts = async () => {
    const response = await fetch(URL_LINK)
    const posts = await response.json()
    setPosts(posts)
  }

  useEffect(() => {
    getPosts()
  }, [])

  return { posts }
}
