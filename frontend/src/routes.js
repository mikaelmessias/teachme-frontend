import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import SignUp from './pages/SignUp';
import UserSignUpForm from './pages/SignUp/UserForm';
import UserSignUpConfirmation from './pages/SignUp/UserForm/Confirmation';
import MentorSignUpForm from './pages/SignUp/MentorForm';
import MentorSignUpConfirmation from './pages/SignUp/MentorForm/Confirmation';
import Login from './pages/Login';

import DashboardUser from './pages/Dashboard/User';

import DashboardMentor from './pages/Dashboard/Mentor';
import MentorSchedule from './pages/Dashboard/Mentor/Schedule';
import MentorProfile from './pages/Dashboard/Mentor/Profile';
import MentorProfileAvailability from './pages/Dashboard/Mentor/Profile/Availability';
import MentorProfileEdit from './pages/Dashboard/Mentor/Profile/Edit';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={SignUp} />
        <Route path="/signup/users" exact component={UserSignUpForm} />
        <Route path="/signup/users/:id/confirmation" component={UserSignUpConfirmation} />
        <Route path="/signup/mentors" exact component={MentorSignUpForm} />
        <Route path="/signup/mentors/:id/confirmation" component={MentorSignUpConfirmation} />
        <Route path="/login" component={Login} />

        <Route path="/dashboard/user" exact component={DashboardUser} />

        <Route path="/dashboard/mentor" exact component={DashboardMentor} />
        <Route path="/dashboard/mentor/schedule" component={MentorSchedule} />
        <Route path="/dashboard/mentor/profile" exact component={MentorProfile} />
        <Route path="/dashboard/mentor/profile/availability" component={MentorProfileAvailability} />
        <Route path="/dashboard/mentor/profile/edit" component={MentorProfileEdit} />
      </Switch>
    </BrowserRouter>
  );
}
