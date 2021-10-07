import axios from "axios";
import { rootApiUrl } from ".";

const url = `${rootApiUrl}/auth`

const loginUser = (data) => axios.post(`${url}/login`, data)
const signupUser = (data) => axios.post(`${url}/signup`, data)
const loadUser = () => axios.get(`${url}/user`, tokenConfig())

const authApi = {
  loginUser,
  signupUser,
  loadUser
}

export default authApi

// Setup config/headers and token
export const tokenConfig = () => {
  // Get token from localstorage
  const accessToken = localStorage.getItem('accessToken')

  // Headers
  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  };

  // If token, add to headers
  if (accessToken) {
    config.headers['authorization'] = accessToken;
  }

  return config;
};