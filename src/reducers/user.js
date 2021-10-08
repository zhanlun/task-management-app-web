import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
  name: 'user',
  initialState: {},
  reducers: {
    userLogin(state, action) {
      localStorage.setItem('accessToken', action.payload.accessToken)
      return action.payload
    },
    userLogout(state, action) {
      localStorage.removeItem('accessToken')
      return {}
    },
  }
})

export const { userLogin, userLogout } = userSlice.actions
export default userSlice.reducer