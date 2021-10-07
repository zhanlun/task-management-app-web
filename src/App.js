
import { BoardList } from "./components/Boards/BoardList";
import { Navbar } from "./components/Layout/Navbar";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Dashboard } from "./components/Lists/Dashboard";
import { LoginPage } from "./components/Login/LoginPage";
import { SignUpPage } from "./components/Login/SignUpPage";
import { PrivateRoute } from "./components/Route/PrivateRoute";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import authApi from "./api/auth";
import { userLogin } from "./reducers/user";
import { useHistory } from 'react-router-dom'

function App() {
  const dispatch = useDispatch()
  const history = useHistory()
  const [userLoaded, setUserLoaded] = useState(false)

  useEffect(() => {
    authApi.loadUser()
      .then((response) => {
        const { data } = response
        dispatch(userLogin(data))
      })
      .catch(error => {
        console.log(error)
      })
      .finally(() => {
        setUserLoaded(true)
      })
  }, [])

  return (
    userLoaded &&
    <Router>
      <Navbar />
      <div className="h-5/6 px-4 sm:px-0 pb-6 sm:pb-0">
        <Switch>
          <PrivateRoute exact path="/">
            <BoardList />
          </PrivateRoute>
          <Route path="/signup">
            <SignUpPage />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/boards/:boardId">
            <Dashboard />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
