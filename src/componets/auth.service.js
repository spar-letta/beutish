import axios from 'axios'
import { URL_LINK_MAIN } from './URLS'
import { useNavigate } from 'react-router-dom'

const login = async (username, password) => {
  const response = await axios.post(`${URL_LINK_MAIN}/beauty/auth/signin`, {
    username,
    password,
  })
  if (response.data.token) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data
}
const logOut = () => {
  localStorage.removeItem('user')
}

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'))
}

export default {
  login,
  logOut,
  getCurrentUser,
}
