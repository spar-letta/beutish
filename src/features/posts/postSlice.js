import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { URL_LINK_MAIN } from '../../componets/URLS'
const url_fetch_posts = `${URL_LINK_MAIN}/post_app/fetch_list_of_posts`

export const getPostItems = createAsyncThunk('posts/getPostItems', () => {
  return fetch(url_fetch_posts)
    .then((resp) => resp.json())
    .catch((error) => console.log(error))
})

export const getSinglePost = createAsyncThunk(
  'posts/getSinglePost',
  (payload) => {
    //payload === post id
    return fetch(`${URL_LINK_MAIN}/post_app/fetch_post_by_id/${payload}`)
      .then((resp) => resp.json())
      .catch((error) => console.log(error))
  }
)

const initialState = {
  post: [],
  singlePost: {},
  isSinglePostOpen: false,
  postLikeCount: 0,
  postlike: 0,
  isLoading: false,
}

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    singlePost: (state, action) => {
      state.singlePost = action.payload
    },
    openCloseSinglePost: (state, action) => {
      state.isSinglePostOpen = action.payload
    },
  },
  extraReducers: {
    [getPostItems.pending]: (state) => {
      state.isLoading = true
    },
    [getPostItems.fulfilled]: (state, action) => {
      state.isLoading = false
      state.post = action.payload
    },
    [getPostItems.rejected]: (state) => {},
    //====================post like count================
    [getSinglePost.pending]: (state) => {
      console.log('loading...')
    },
    [getSinglePost.fulfilled]: (state, action) => {
      state.singlePost = action.payload
    },
    [getSinglePost.rejected]: (state) => {},
  },
})

export const { singlePost, openCloseSinglePost } = postSlice.actions

export default postSlice.reducer
