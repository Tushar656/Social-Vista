import Home from './Pages/Home/Home'
import Profile from './Pages/Profile/profile';
import Login from './Pages/Login/login';
import Register from './Pages/Register/register';
import {
  BrowserRouter as Router,
  Redirect,
  Route
} from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from './context/Authcontext';
import Messanger from './components/Messenger/Messanger';

function App() {
  const {user} = useContext(AuthContext)
  return (
    <>
      <Router>
          <Route exact path="/">
            {user ? <Home/> : <Login/>}
          </Route>
          <Route exact path="/messanger">
            {user ? <Messanger/> : <Login/>}
          </Route>
          <Route path="/profile/:username">
            {/* {user ? <Profile/> : <Login/>} */}
            <Profile/>
          </Route>
          <Route path="/login">
            {user ? <Redirect to="/"/>  : <Login/>}
          </Route>
          <Route path="/register">
          {user ? <Redirect to="/"/>  : <Register/>}
          </Route>
      </Router>
    </>
  );
}

export default App;
