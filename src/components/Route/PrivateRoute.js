import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

export function PrivateRoute({ children, ...rest }) {
  const user = useSelector(state => state.user)

  return (
    <Route
      {...rest}
    >
      {
        ({ location }) =>
          user.accessToken ?
            children :
            <Redirect to={{
              pathname: '/login',
              state: { from: location }
            }} />
      }
    </Route>
  )
}
