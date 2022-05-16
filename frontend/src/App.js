import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import HomePage from './components/Home';
import * as sessionActions from "./store/session";

import { getNotebooks } from './store/notebooks';
import { getNotes } from './store/notes';

function App() {
  const dispatch = useDispatch();

  // This checks to see if a user was checked for at all
  const [isLoaded, setIsLoaded] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const sessionUser = useSelector(state => state.session.user);

  useEffect(() => {
    dispatch(getNotebooks()).then(() => dispatch(getNotes())).then(() => setDataLoaded(true))
  }, [dispatch, sessionUser])

  return (
    <>
      {isLoaded && dataLoaded && (
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
