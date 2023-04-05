import './App.css'
import { useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './componets/Navbar'
import Home from './componets/Home'
import About from './componets/About'
import ContactUs from './componets/ContactUs'
import Signup from './componets/Signup'
import Account from './componets/Account'
import SinglePostPage from './componets/SinglePostPage'
import Profile from './componets/Profile'
import { useDispatch, useSelector } from 'react-redux'
import { getPostItems } from './features/posts/postSlice'

function App() {
  const dispatch = useDispatch()
  const { post = [] } = useSelector((store) => store.post)

  useEffect(() => {
    dispatch(getPostItems())
  }, [post.length])

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' exact element={<Home />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/contact-us' element={<ContactUs />}></Route>
        <Route path='/account' element={<Account />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/profile' element={<Profile />}></Route>
        <Route
          path='/single-page-post/:post_id'
          element={<SinglePostPage />}
        ></Route>
      </Routes>
    </Router>
  )
}

export default App
