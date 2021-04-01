import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import SignUp from './SignUp';
import Login from './Login';
import User from './User';
import EditForm from './EditForm';
import Error from './Error';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="container wrapper">
          <Switch>
            <Route exact path="/">
              <Home/>
            </Route>
            <Route path="/sign-up">
              <SignUp />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/error">
              <Error />
            </Route>
            <Route exact path="/users/:id">
              <User />
            </Route>
            <Route path="/users/:id/edit">
              <EditForm />
            </Route>
          </Switch>
          
        </div>
      </div>
    </Router>

  );
}

export default App;
