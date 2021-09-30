
import { BoardList } from "./components/Boards/BoardList";
import { Navbar } from "./components/Layout/Navbar";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Dashboard } from "./components/Lists/Dashboard";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="h-5/6 px-4 sm:px-0 pb-6 sm:pb-0">
        <Switch>
          <Route exact path="/">
            <BoardList />
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
