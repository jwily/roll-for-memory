import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import HomePage from './components/Home';
import * as sessionActions from "./store/session";

function App() {
  const dispatch = useDispatch();

  // This checks to see if a user was checked for at all
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const sessionUser = useSelector(state => state.session.user);

  return (
    <>
      {isLoaded && (
        <Switch>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path='/'>
            {sessionUser ? <HomePage isLoaded={isLoaded} user={sessionUser} /> : <LoginFormPage />}
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
