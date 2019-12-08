import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import SignUp from './pages/SignUp';
import UserSignUpForm from './pages/SignUp/UserForm';
import UserSignUpConfirmation from './pages/SignUp/UserForm/Confirmation';
import MentorSignUpForm from './pages/SignUp/MentorForm';
import MentorSignUpConfirmation from './pages/SignUp/MentorForm/Confirmation';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={SignUp} />
        <Route path="/signup/users" exact component={UserSignUpForm} />
        <Route path="/signup/users/:id/confirmation" component={UserSignUpConfirmation} />
        <Route path="/signup/mentors" exact component={MentorSignUpForm} />
        <Route path="/signup/mentors/:id/confirmation" component={MentorSignUpConfirmation} />
      </Switch>
    </BrowserRouter>
  );
}