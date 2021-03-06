import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import authApi from '../../api/auth'
import { userLogin } from '../../reducers/user'

export const SignUpPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const history = useHistory()

  useEffect(() => {
    if (user.accessToken) {
      history.push('/')
    }
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!username || !password) {
      setError('Please complete all required fields')
      return
    }

    if (username.length < 4 || password.length < 4) {
      setError('Username and password should have at least 4 characters')
      return
    }

    // api request
    authApi.signupUser({
      username,
      password,
    }).then((response) => {
      const { data } = response
      setError(null)

      dispatch(userLogin({ ...data }))
      // redirect
      history.push('/')

    }).catch((error) => {
      if (error.response) {
        setError(error.response.data)
      } else if (error.request) {
        console.log(error.request)
      } else {
        console.log(error.response)
      }
    })
  }

  return (
    <div className="bg-gray-50 mx-auto pt-4 px-6 w-72 md:w-96 rounded shadow mt-12">
      <h2 className="text-center font-bold tracking-wide my-4 text-gray-800 uppercase">
        Sign Up
      </h2>

      <div className="pb-6">
        <form onSubmit={handleSubmit}>
          <div className="my-4">
            <label htmlFor="username"
              className="text-left tracking-wide uppercase text-sm font-bold text-gray-700"
            >
              Username
            </label>
            <input type="text" placeholder={"Username"}
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="my-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-400 focus:ring focus:ring-indigo-500" />

          </div>

          <div className="my-4">
            <label htmlFor="password"
              className="text-left tracking-wide uppercase text-sm font-bold text-gray-700"
            >
              Password
            </label>
            <input type="password" placeholder={"Password"}
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="my-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-400 focus:ring focus:ring-indigo-500" />
          </div>

          {
            error &&
            <div className="flex pb-2">
              <span className="text-red-600 mr-1">*</span>
              <span className="text-red-600 tracking-wide text-sm flex-grow">
                {error}
              </span>
            </div>
          }
          <button
            type="submit"
            className="w-full mx-auto text-white tracking-wide rounded uppercase text-lg py-2 bg-indigo-500 bg-opacity-100 hover:bg-opacity-90 select-none">
            Sign Up
          </button>
        </form>

      </div>

    </div >
  )
}
