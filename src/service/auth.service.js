import axios from 'axios'
const API_URL = `http://localhost:8083/user/`

const login = async (username, password) => {
  const response = await axios.post(API_URL + 'login', {
    username,
    password,
  })
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
    console.log(response.data.message)
  }

  return response.data
}

const logout = () => {
  localStorage.removeItem('user')
}
export default {
  login,
  logout,
}
